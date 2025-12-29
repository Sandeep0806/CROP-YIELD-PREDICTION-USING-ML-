# Test the App - Step by Step

## Step 1: Make Sure ML Service is Running

```bash
cd /Users/sandeeepkokkonda/Desktop/crope/ml_service
python3 main.py
```

Should see: `✅ ML Model loaded successfully!`

## Step 2: Start Mobile App

```bash
cd /Users/sandeeepkokkonda/Desktop/crope/mobile-app
npx expo start --clear
```

## Step 3: Test on Your Device

1. **Open Expo Go** on your phone
2. **Enter URL manually** (more reliable than QR)
3. **Paste the `exp://` URL** from terminal

## Step 4: Fill the Form

1. Select **Crop Type**: Wheat
2. Select **Season**: Kharif
3. Enter **Area**: 10
4. Enter **Temperature**: 25
5. Enter **Rainfall**: 800
6. (Other fields are optional)

## Step 5: Test Prediction

Tap **"Predict Yield"** button.

## Expected Result

You should see:
- Predicted yield (e.g., 4.25 t/ha)
- Confidence percentage
- Recommendations
- Risk factors

## If You See Errors

### Error: "Network request failed"
- Check ML service is running
- For physical device, update IP in App.tsx (line ~120)

### Error: "Cannot read property"
- The app now has null checks - this should be fixed

### Error: Blank screen
- Check terminal for error messages
- Try clearing cache: `npx expo start --clear`

## What Was Fixed

✅ Removed ErrorBoundary class (was causing issues)
✅ Added null checks for all data
✅ Better error handling
✅ Platform-specific URL handling
✅ Safer async operations

The app should now work without runtime errors!



