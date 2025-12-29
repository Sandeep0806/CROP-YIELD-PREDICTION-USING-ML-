#!/bin/bash

# Crop Yield Prediction System - Startup Script
# This script starts both the Next.js frontend and Python ML service

echo "🌾 Starting Crop Yield Prediction System..."
echo ""

# Check if ML service models exist
if [ ! -f "ml_service/models/crop_yield_model.pkl" ]; then
    echo "⚠️  ML model not found. Training model first..."
    cd ml_service
    python train_model.py
    cd ..
    echo "✅ Model trained successfully!"
    echo ""
fi

# Start ML service in background
echo "🤖 Starting ML service on port 8000..."
cd ml_service
if [ -d "venv" ]; then
    source venv/bin/activate
fi
python main.py &
ML_PID=$!
cd ..

# Wait a bit for ML service to start
sleep 3

# Start Next.js frontend
echo "🚀 Starting Next.js frontend on port 3000..."
npm run dev &
NEXT_PID=$!

echo ""
echo "✅ Both services are starting!"
echo "   - Frontend: http://localhost:3000"
echo "   - ML API: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user interrupt
trap "kill $ML_PID $NEXT_PID 2>/dev/null; exit" INT TERM
wait












