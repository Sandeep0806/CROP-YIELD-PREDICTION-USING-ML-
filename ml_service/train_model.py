"""
Crop Yield Prediction Model Training Script
Trains a Random Forest model on agricultural data
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os

def generate_synthetic_data(n_samples=5000):
    """
    Generate synthetic agricultural data for training
    In production, replace this with real agricultural datasets
    """
    np.random.seed(42)
    
    # Crop types
    crops = ['wheat', 'rice', 'corn', 'sugarcane', 'cotton', 'soybean']
    
    data = []
    for _ in range(n_samples):
        crop = np.random.choice(crops)
        
        # Base yield varies by crop
        base_yields = {
            'wheat': 4.0, 'rice': 5.0, 'corn': 3.5, 
            'sugarcane': 6.0, 'cotton': 2.5, 'soybean': 3.0
        }
        
        # Generate realistic features
        area = np.random.uniform(0.5, 100)
        soil_ph = np.random.uniform(4.5, 8.5)
        soil_moisture = np.random.uniform(20, 80)
        nitrogen = np.random.uniform(30, 200)
        phosphorus = np.random.uniform(10, 100)
        potassium = np.random.uniform(20, 150)
        temperature = np.random.uniform(15, 40)
        rainfall = np.random.uniform(200, 2000)
        humidity = np.random.uniform(30, 90)
        season = np.random.choice(['kharif', 'rabi', 'zaid'])
        
        # Calculate yield based on realistic relationships
        base_yield = base_yields[crop]
        
        # Soil pH effect (optimal around 6.5-7.0)
        ph_factor = 1.0
        if 6.5 <= soil_ph <= 7.0:
            ph_factor = 1.15
        elif soil_ph < 5.5 or soil_ph > 8.0:
            ph_factor = 0.85
        
        # Nutrient effects
        n_factor = min(1.2, 0.8 + (nitrogen / 150) * 0.4)
        p_factor = min(1.15, 0.85 + (phosphorus / 80) * 0.3)
        k_factor = min(1.1, 0.9 + (potassium / 100) * 0.2)
        
        # Weather effects
        temp_factor = 1.0
        if 20 <= temperature <= 30:
            temp_factor = 1.1
        elif temperature < 15 or temperature > 35:
            temp_factor = 0.9
        
        rainfall_factor = 1.0
        if 600 <= rainfall <= 1200:
            rainfall_factor = 1.08
        elif rainfall < 400:
            rainfall_factor = 0.85
        elif rainfall > 1800:
            rainfall_factor = 0.9
        
        humidity_factor = 1.0
        if 60 <= humidity <= 75:
            humidity_factor = 1.05
        
        # Soil moisture effect
        moisture_factor = 1.0
        if 45 <= soil_moisture <= 55:
            moisture_factor = 1.08
        elif soil_moisture < 30:
            moisture_factor = 0.85
        
        # Season effect
        season_factors = {'kharif': 1.0, 'rabi': 0.95, 'zaid': 0.9}
        season_factor = season_factors[season]
        
        # Calculate final yield with some randomness
        yield_value = (base_yield * ph_factor * n_factor * p_factor * k_factor * 
                      temp_factor * rainfall_factor * humidity_factor * 
                      moisture_factor * season_factor)
        yield_value += np.random.normal(0, yield_value * 0.1)  # 10% noise
        yield_value = max(0.5, yield_value)  # Ensure positive
        
        data.append({
            'crop_type': crop,
            'area': area,
            'soil_ph': soil_ph,
            'soil_moisture': soil_moisture,
            'nitrogen': nitrogen,
            'phosphorus': phosphorus,
            'potassium': potassium,
            'temperature': temperature,
            'rainfall': rainfall,
            'humidity': humidity,
            'season': season,
            'yield': yield_value
        })
    
    return pd.DataFrame(data)

def train_model():
    """Train the Random Forest model"""
    print("Generating training data...")
    df = generate_synthetic_data(n_samples=5000)
    
    print(f"Dataset shape: {df.shape}")
    print(f"\nDataset statistics:")
    print(df.describe())
    
    # Encode categorical variables
    le_crop = LabelEncoder()
    le_season = LabelEncoder()
    
    df['crop_type_encoded'] = le_crop.fit_transform(df['crop_type'])
    df['season_encoded'] = le_season.fit_transform(df['season'])
    
    # Features
    feature_columns = [
        'crop_type_encoded', 'area', 'soil_ph', 'soil_moisture',
        'nitrogen', 'phosphorus', 'potassium', 'temperature',
        'rainfall', 'humidity', 'season_encoded'
    ]
    
    X = df[feature_columns]
    y = df['yield']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    print(f"\nTraining set size: {X_train.shape[0]}")
    print(f"Test set size: {X_test.shape[0]}")
    
    # Train Random Forest model
    print("\nTraining Random Forest model...")
    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)
    
    train_mae = mean_absolute_error(y_train, y_pred_train)
    test_mae = mean_absolute_error(y_test, y_pred_test)
    train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
    test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    train_r2 = r2_score(y_train, y_pred_train)
    test_r2 = r2_score(y_test, y_pred_test)
    
    print("\n" + "="*50)
    print("MODEL EVALUATION RESULTS")
    print("="*50)
    print(f"Training MAE: {train_mae:.3f} t/ha")
    print(f"Test MAE: {test_mae:.3f} t/ha")
    print(f"Training RMSE: {train_rmse:.3f} t/ha")
    print(f"Test RMSE: {test_rmse:.3f} t/ha")
    print(f"Training R²: {train_r2:.3f}")
    print(f"Test R²: {test_r2:.3f}")
    print("="*50)
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': feature_columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance.to_string(index=False))
    
    # Save model and encoders
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/crop_yield_model.pkl')
    joblib.dump(le_crop, 'models/crop_encoder.pkl')
    joblib.dump(le_season, 'models/season_encoder.pkl')
    
    # Save feature columns for reference
    import json
    with open('models/feature_columns.json', 'w') as f:
        json.dump(feature_columns, f)
    
    print("\n✅ Model saved successfully!")
    print("Model files saved in 'models/' directory:")
    print("  - crop_yield_model.pkl")
    print("  - crop_encoder.pkl")
    print("  - season_encoder.pkl")
    print("  - feature_columns.json")
    
    return model, le_crop, le_season

if __name__ == '__main__':
    train_model()













