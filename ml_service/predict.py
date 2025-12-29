"""
Crop Yield Prediction Service
Uses trained ML model to predict crop yields
"""

import joblib
import numpy as np
import json
import os
from typing import Dict, List

class CropYieldPredictor:
    def __init__(self, model_path='models/crop_yield_model.pkl'):
        """Load the trained model and encoders"""
        self.model = joblib.load(model_path)
        self.crop_encoder = joblib.load('models/crop_encoder.pkl')
        self.season_encoder = joblib.load('models/season_encoder.pkl')
        
        with open('models/feature_columns.json', 'r') as f:
            self.feature_columns = json.load(f)
    
    def predict(self, input_data: Dict) -> Dict:
        """
        Predict crop yield based on input features
        
        Args:
            input_data: Dictionary with crop prediction features
            
        Returns:
            Dictionary with prediction results
        """
        # Encode categorical variables
        crop_encoded = self.crop_encoder.transform([input_data['cropType']])[0]
        season_encoded = self.season_encoder.transform([input_data['season']])[0]
        
        # Prepare feature array
        features = np.array([[
            crop_encoded,
            float(input_data['area']),
            float(input_data['soilPh']),
            float(input_data['soilMoisture']),
            float(input_data['nitrogen']),
            float(input_data['phosphorus']),
            float(input_data['potassium']),
            float(input_data['temperature']),
            float(input_data['rainfall']),
            float(input_data['humidity']),
            season_encoded
        ]])
        
        # Make prediction
        predicted_yield = self.model.predict(features)[0]
        predicted_yield = max(0.1, predicted_yield)  # Ensure positive
        
        # Calculate confidence based on feature ranges
        confidence = self._calculate_confidence(input_data)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(input_data, predicted_yield)
        
        # Identify risk factors
        risk_factors = self._identify_risks(input_data)
        
        return {
            'predictedYield': round(predicted_yield, 2),
            'confidence': confidence,
            'recommendations': recommendations,
            'riskFactors': risk_factors
        }
    
    def _calculate_confidence(self, input_data: Dict) -> int:
        """Calculate prediction confidence based on input quality"""
        confidence = 75  # Base confidence
        
        # Check if values are in optimal ranges
        soil_ph = float(input_data['soilPh'])
        if 6.5 <= soil_ph <= 7.0:
            confidence += 5
        
        soil_moisture = float(input_data['soilMoisture'])
        if 45 <= soil_moisture <= 55:
            confidence += 5
        
        temperature = float(input_data['temperature'])
        if 20 <= temperature <= 30:
            confidence += 5
        
        rainfall = float(input_data['rainfall'])
        if 600 <= rainfall <= 1200:
            confidence += 5
        
        nitrogen = float(input_data['nitrogen'])
        if 80 <= nitrogen <= 120:
            confidence += 5
        
        return min(95, confidence)
    
    def _generate_recommendations(self, input_data: Dict, predicted_yield: float) -> List[str]:
        """Generate recommendations based on input features"""
        recommendations = []
        
        soil_ph = float(input_data['soilPh'])
        if soil_ph < 6.0:
            recommendations.append('Add lime to increase soil pH to optimal range (6.5-7.0)')
        elif soil_ph > 8.0:
            recommendations.append('Add sulfur or organic matter to lower soil pH')
        
        nitrogen = float(input_data['nitrogen'])
        if nitrogen < 80:
            recommendations.append(f'Increase nitrogen application to 80-120 kg/ha for better growth')
        elif nitrogen > 150:
            recommendations.append('Reduce nitrogen to avoid over-fertilization')
        
        phosphorus = float(input_data['phosphorus'])
        if phosphorus < 40:
            recommendations.append('Apply phosphorus fertilizer (40-60 kg/ha recommended)')
        
        potassium = float(input_data['potassium'])
        if potassium < 50:
            recommendations.append('Add potassium fertilizer (50-80 kg/ha recommended)')
        
        rainfall = float(input_data['rainfall'])
        if rainfall < 600:
            recommendations.append('Ensure adequate irrigation during dry periods (target: 600-1200mm)')
        elif rainfall > 1500:
            recommendations.append('Implement proper drainage to prevent waterlogging')
        
        temperature = float(input_data['temperature'])
        if temperature > 32:
            recommendations.append('Monitor for heat stress; consider shade or cooling measures')
        elif temperature < 18:
            recommendations.append('Protect crops from cold stress with appropriate coverings')
        
        soil_moisture = float(input_data['soilMoisture'])
        if soil_moisture < 40:
            recommendations.append('Irrigate immediately to maintain optimal soil moisture (45-55%)')
        elif soil_moisture > 65:
            recommendations.append('Improve drainage to prevent waterlogging')
        
        if len(recommendations) == 0:
            recommendations.append('Maintain current practices for optimal yield')
        
        return recommendations
    
    def _identify_risks(self, input_data: Dict) -> List[str]:
        """Identify potential risk factors"""
        risks = []
        
        soil_ph = float(input_data['soilPh'])
        if soil_ph < 5.5 or soil_ph > 8.0:
            risks.append('Suboptimal soil pH may significantly affect nutrient availability and crop health')
        
        rainfall = float(input_data['rainfall'])
        if rainfall > 1800:
            risks.append('Excessive rainfall may cause waterlogging and root diseases')
        elif rainfall < 400:
            risks.append('Severe drought conditions may require intensive irrigation')
        
        temperature = float(input_data['temperature'])
        if temperature < 15 or temperature > 35:
            risks.append('Extreme temperatures may cause significant crop stress')
        
        soil_moisture = float(input_data['soilMoisture'])
        if soil_moisture < 30:
            risks.append('Critical soil moisture level - immediate irrigation required')
        elif soil_moisture > 70:
            risks.append('High soil moisture may lead to root rot and reduced oxygen availability')
        
        nitrogen = float(input_data['nitrogen'])
        if nitrogen < 50:
            risks.append('Insufficient nitrogen may severely limit crop growth and yield')
        
        return risks












