# Complete Setup Guide

## Quick Start (Recommended)

### For macOS/Linux:
```bash
./start.sh
```

### For Windows:
```bash
start.bat
```

This will automatically:
1. Train the ML model (if not already trained)
2. Start the Python ML service on port 8000
3. Start the Next.js frontend on port 3000

## Manual Setup

### Step 1: Install Frontend Dependencies

```bash
npm install
```

### Step 2: Setup Python ML Service

```bash
cd ml_service

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Train the ML Model

```bash
# Make sure you're in ml_service directory with venv activated
python train_model.py
```

This will:
- Generate 5000 synthetic training samples
- Train a Random Forest model
- Save the model to `models/` directory
- Display model performance metrics

**Expected Output:**
```
Training MAE: ~0.3-0.4 t/ha
Test MAE: ~0.4-0.5 t/ha
R² Score: ~0.85-0.90
```

### Step 4: Start ML Service

```bash
# In ml_service directory with venv activated
python main.py
```

You should see:
```
✅ ML Model loaded successfully!
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 5: Start Next.js Frontend

Open a new terminal:

```bash
# In project root
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### Step 6: Open the Application

Visit http://localhost:3000 in your browser.

## Verifying the Setup

### Test ML Service

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Test Prediction API

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

## Troubleshooting

### Issue: "ML service is not available"

**Solution:**
1. Check if ML service is running: `curl http://localhost:8000/health`
2. Ensure you're in the `ml_service` directory
3. Verify virtual environment is activated
4. Check if model files exist: `ls ml_service/models/`

### Issue: "Model not found"

**Solution:**
```bash
cd ml_service
python train_model.py
```

### Issue: Port 8000 already in use

**Solution:**
1. Find the process: `lsof -i :8000` (macOS/Linux) or `netstat -ano | findstr :8000` (Windows)
2. Kill the process or change port in `ml_service/main.py`

### Issue: Python dependencies not found

**Solution:**
```bash
cd ml_service
pip install -r requirements.txt
```

### Issue: Node modules errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Using Real Agricultural Data

To replace synthetic data with real data:

1. Prepare your dataset in CSV format with these columns:
   - crop_type, area, soil_ph, soil_moisture, nitrogen, phosphorus, potassium, temperature, rainfall, humidity, season, yield

2. Modify `ml_service/train_model.py`:
   ```python
   def load_real_data():
       return pd.read_csv('path/to/your/data.csv')
   
   # Replace generate_synthetic_data() call with:
   df = load_real_data()
   ```

3. Retrain the model:
   ```bash
   python train_model.py
   ```

4. Restart the ML service

## Production Deployment

### Frontend (Vercel/Netlify)
- Deploy Next.js app to Vercel
- Set environment variable: `ML_SERVICE_URL` to your ML service URL

### ML Service (Docker/Cloud)
- Containerize with Docker
- Deploy to AWS/GCP/Azure
- Update CORS settings in `main.py` for your frontend domain

## Architecture

```
┌─────────────────┐
│   Next.js App   │  (Port 3000)
│   (Frontend)    │
└────────┬────────┘
         │ HTTP Request
         ▼
┌─────────────────┐
│  Next.js API    │  /api/predict
│     Route       │
└────────┬────────┘
         │ HTTP Request
         ▼
┌─────────────────┐
│  FastAPI Server │  (Port 8000)
│   (ML Service)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Random Forest  │
│     Model       │
│  (scikit-learn) │
└─────────────────┘
```

## Next Steps

- [ ] Replace synthetic data with real agricultural datasets
- [ ] Add more crop types
- [ ] Implement model retraining pipeline
- [ ] Add user authentication
- [ ] Integrate weather APIs
- [ ] Add historical data tracking












