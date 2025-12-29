"""
FastAPI server for Crop Yield Prediction
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from predict import CropYieldPredictor
import os

app = FastAPI(title="Crop Yield Prediction API", version="1.0.0")

# CORS middleware to allow Next.js frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize predictor
predictor = None

@app.on_event("startup")
async def startup_event():
    """Load ML model on startup"""
    global predictor
    try:
        if os.path.exists('models/crop_yield_model.pkl'):
            predictor = CropYieldPredictor()
            print("✅ ML Model loaded successfully!")
        else:
            print("⚠️  Model not found. Please run train_model.py first.")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

class PredictionRequest(BaseModel):
    cropType: str
    area: str
    soilPh: str
    soilMoisture: str
    nitrogen: str
    phosphorus: str
    potassium: str
    temperature: str
    rainfall: str
    humidity: str
    season: str

class PredictionResponse(BaseModel):
    predictedYield: float
    confidence: int
    recommendations: List[str]
    riskFactors: List[str]

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Crop Yield Prediction API",
        "status": "running",
        "model_loaded": predictor is not None
    }

@app.get("/health")
async def health():
    """Health check with model status"""
    return {
        "status": "healthy",
        "model_loaded": predictor is not None
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_yield(request: PredictionRequest):
    """
    Predict crop yield based on input parameters
    """
    if predictor is None:
        raise HTTPException(
            status_code=503,
            detail="ML model not loaded. Please train the model first."
        )
    
    try:
        # Convert request to dict
        input_data = request.dict()
        
        # Validate crop type
        valid_crops = ['wheat', 'rice', 'corn', 'sugarcane', 'cotton', 'soybean']
        if input_data['cropType'] not in valid_crops:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid crop type. Must be one of: {valid_crops}"
            )
        
        # Validate season
        valid_seasons = ['kharif', 'rabi', 'zaid']
        if input_data['season'] not in valid_seasons:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid season. Must be one of: {valid_seasons}"
            )
        
        # Make prediction
        result = predictor.predict(input_data)
        
        return PredictionResponse(**result)
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)












