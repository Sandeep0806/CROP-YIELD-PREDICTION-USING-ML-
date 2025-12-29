# Crop Yield Prediction System

## Abstract

The Crop Yield Prediction System is an AI-powered agricultural intelligence platform that leverages machine learning to predict crop yields with high accuracy. Built with modern web technologies (Next.js) and a Python-based ML backend, the system analyzes multiple agricultural parameters including soil properties, weather conditions, nutrient levels, and crop-specific data to generate reliable yield predictions. The platform provides farmers and agricultural professionals with actionable insights, risk assessments, and optimization recommendations to improve crop productivity and make informed farming decisions. The system supports multiple crop types (wheat, rice, corn, sugarcane, cotton, soybean) and features an intuitive dashboard with real-time analytics and data visualization capabilities.

---

A modern, AI-powered web application for predicting crop yields based on various agricultural parameters using **Machine Learning**.

## Features

- 🤖 **ML-Powered Predictions**: Random Forest regression model for accurate yield prediction
- 📊 **Interactive Dashboard**: Visual analytics and trends
- 🌾 **Multiple Crops**: Support for wheat, rice, corn, sugarcane, cotton, and soybean
- 📈 **Real-time Analytics**: Charts and graphs for data visualization
- 💡 **Smart Recommendations**: AI-generated recommendations for optimal yield
- ⚠️ **Risk Assessment**: Identifies potential risk factors
- 🔄 **Real-time ML Integration**: FastAPI backend with scikit-learn models

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

### Backend & ML
- **FastAPI** - Python API framework
- **scikit-learn** - Machine learning library
- **Random Forest Regressor** - ML model for predictions
- **Pandas & NumPy** - Data processing

## Getting Started

### Prerequisites

- **Node.js 18+** installed
- **Python 3.8+** installed
- npm or yarn package manager
- pip (Python package manager)

### Installation

#### 1. Setup Frontend (Next.js)

```bash
# Install Node.js dependencies
npm install

# Run the development server
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

#### 2. Setup ML Service (Python)

```bash
# Navigate to ML service directory
cd ml_service

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Train the ML model
python train_model.py

# Start the ML service
python main.py
```

The ML API will be available at `http://localhost:8000`

**Note:** Both services need to be running simultaneously for the app to work properly.

## Usage

1. Fill in the prediction form with:
   - Crop type
   - Area (hectares)
   - Soil properties (pH, moisture, nutrients)
   - Weather conditions (temperature, rainfall, humidity)
   - Season

2. Click "Predict Yield" to get AI-powered predictions

3. View results including:
   - Predicted yield in tons/hectare
   - Confidence level
   - Recommendations for improvement
   - Risk factors to watch

## Project Structure

```
crope/
├── app/
│   ├── api/
│   │   └── predict/
│   │       └── route.ts    # Next.js API route (connects to ML service)
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── Dashboard.tsx       # Analytics dashboard
│   ├── PredictionForm.tsx  # Input form component
│   └── PredictionResults.tsx # Results display
├── ml_service/
│   ├── main.py             # FastAPI server
│   ├── train_model.py      # ML model training script
│   ├── predict.py          # Prediction logic
│   ├── requirements.txt    # Python dependencies
│   └── models/             # Trained ML models (generated after training)
└── package.json
```

## ML Model Details

### Primary Algorithm

**Random Forest Regressor** - An ensemble learning method that combines multiple decision trees to create a robust and accurate prediction model.

#### Algorithm Configuration:
- **Number of Trees (n_estimators)**: 200
- **Max Depth**: 15
- **Min Samples Split**: 5
- **Min Samples Leaf**: 2
- **Random State**: 42 (for reproducibility)
- **Parallel Processing**: Enabled (n_jobs=-1)

#### Why Random Forest?
- Handles non-linear relationships between features and yield
- Provides feature importance scores
- Reduces overfitting through ensemble averaging
- Works well with mixed data types (categorical and numerical)
- Robust to outliers and missing values

### Supporting Algorithms & Techniques

1. **Label Encoding** (scikit-learn)
   - Encodes categorical variables (crop type, season) into numerical values
   - Used for: `crop_type` → numerical encoding
   - Used for: `season` → numerical encoding

2. **Data Preprocessing**
   - Feature normalization and scaling
   - Categorical variable encoding
   - Feature engineering for agricultural parameters

### Model Specifications

- **Training Data**: 5000 synthetic agricultural samples
- **Features**: 11 input features
  - Crop type (categorical)
  - Area (hectares)
  - Soil pH
  - Soil moisture (%)
  - Nitrogen (kg/ha)
  - Phosphorus (kg/ha)
  - Potassium (kg/ha)
  - Temperature (°C)
  - Rainfall (mm)
  - Humidity (%)
  - Season (categorical)
- **Target Variable**: Crop yield (tons/hectare)
- **Performance Metrics**:
  - R² Score: ~85-90%
  - Mean Absolute Error (MAE): ~0.4-0.5 t/ha
  - Root Mean Squared Error (RMSE): Calculated during training
- **Model Location**: `ml_service/models/crop_yield_model.pkl`

### Model Evaluation

The model is evaluated using standard regression metrics:
- **R² Score**: Measures the proportion of variance explained by the model
- **MAE (Mean Absolute Error)**: Average absolute difference between predicted and actual values
- **RMSE (Root Mean Squared Error)**: Penalizes larger errors more heavily
- **Feature Importance**: Provides insights into which factors most influence crop yield

## Running the Complete System

### Option 1: Manual (Two Terminals)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - ML Service:**
```bash
cd ml_service
source venv/bin/activate  # If using venv
python main.py
```

### Option 2: Using Scripts (Coming Soon)

You can create startup scripts to run both services simultaneously.

## API Endpoints

### ML Service (Python FastAPI)
- `GET http://localhost:8000/` - Health check
- `GET http://localhost:8000/health` - Detailed health check
- `POST http://localhost:8000/predict` - Predict crop yield

### Next.js API
- `POST http://localhost:3000/api/predict` - Proxy to ML service

## Troubleshooting

**ML Service not responding:**
- Ensure Python service is running on port 8000
- Check if model files exist in `ml_service/models/`
- Run `python train_model.py` if models are missing

**CORS errors:**
- ML service CORS is configured for `localhost:3000`
- Check if both services are running on correct ports

**Model training errors:**
- Ensure all Python dependencies are installed
- Check Python version (3.8+ required)

## Future Enhancements

- Integration with real agricultural datasets
- Model retraining pipeline
- Historical data tracking and analytics
- User authentication and farm management
- Weather API integration
- Mobile app version
- Export predictions to PDF/Excel
- Model versioning and A/B testing

## License

MIT

