@echo off
REM Crop Yield Prediction System - Startup Script for Windows
REM This script starts both the Next.js frontend and Python ML service

echo 🌾 Starting Crop Yield Prediction System...
echo.

REM Check if ML service models exist
if not exist "ml_service\models\crop_yield_model.pkl" (
    echo ⚠️  ML model not found. Training model first...
    cd ml_service
    python train_model.py
    cd ..
    echo ✅ Model trained successfully!
    echo.
)

REM Start ML service
echo 🤖 Starting ML service on port 8000...
start "ML Service" cmd /k "cd ml_service && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) && python main.py"

REM Wait a bit for ML service to start
timeout /t 3 /nobreak >nul

REM Start Next.js frontend
echo 🚀 Starting Next.js frontend on port 3000...
start "Next.js Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both services are starting!
echo    - Frontend: http://localhost:3000
echo    - ML API: http://localhost:8000
echo.
echo Close the command windows to stop the services.

pause











