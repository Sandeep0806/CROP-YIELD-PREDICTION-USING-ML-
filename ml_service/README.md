# ML Service for Crop Yield Prediction

This directory contains the machine learning service for crop yield prediction using Random Forest regression.

## Setup

### 1. Install Python Dependencies

```bash
cd ml_service
pip install -r requirements.txt
```

Or using virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Train the Model

First, train the ML model with synthetic agricultural data:

```bash
python train_model.py
```

This will:
- Generate 5000 synthetic training samples
- Train a Random Forest Regressor model
- Evaluate model performance
- Save the model to `models/` directory

**Expected Output:**
- Training MAE: ~0.3-0.4 t/ha
- Test MAE: ~0.4-0.5 t/ha
- R² Score: ~0.85-0.90

### 3. Start the ML Service

Run the FastAPI server:

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### 4. Test the API

Check if the service is running:

```bash
curl http://localhost:8000/health
```

Test a prediction:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "cropType": "wheat",
    "area": "10",
    "soilPh": "6.5",
    "soilMoisture": "50",
    "nitrogen": "100",
    "phosphorus": "50",
    "potassium": "60",
    "temperature": "25",
    "rainfall": "800",
    "humidity": "65",
    "season": "rabi"
  }'
```

## API Endpoints

### `GET /`
Health check and service info

### `GET /health`
Detailed health check with model status

### `POST /predict`
Predict crop yield

**Request Body:**
```json
{
  "cropType": "wheat",
  "area": "10",
  "soilPh": "6.5",
  "soilMoisture": "50",
  "nitrogen": "100",
  "phosphorus": "50",
  "potassium": "60",
  "temperature": "25",
  "rainfall": "800",
  "humidity": "65",
  "season": "rabi"
}
```

**Response:**
```json
{
  "predictedYield": 4.25,
  "confidence": 85,
  "recommendations": [
    "Maintain current practices for optimal yield"
  ],
  "riskFactors": []
}
```

## Model Details

- **Algorithm**: Random Forest Regressor
- **Features**: 11 input features (crop type, area, soil properties, nutrients, weather)
- **Training Data**: 5000 synthetic samples (can be replaced with real data)
- **Performance**: ~85-90% R² score on test data

## Using Real Data

To use real agricultural data:

1. Replace the `generate_synthetic_data()` function in `train_model.py` with your dataset
2. Ensure your dataset has the same feature columns
3. Retrain the model: `python train_model.py`
4. Restart the service: `python main.py`

## Integration with Next.js

The Next.js frontend automatically connects to this service. Make sure:

1. ML service is running on port 8000
2. Next.js app is running on port 3000
3. CORS is properly configured (already set in `main.py`)

## Troubleshooting

**Model not found error:**
- Run `python train_model.py` first to create the model

**Port already in use:**
- Change port in `main.py` or kill the process using port 8000

**Import errors:**
- Ensure all dependencies are installed: `pip install -r requirements.txt`











