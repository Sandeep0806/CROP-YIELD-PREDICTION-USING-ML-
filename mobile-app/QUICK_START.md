# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
cd mobile-app
npm install
```

## Step 2: Start ML Service (Terminal 1)

```bash
cd ../ml_service
python3 main.py
```

Keep this running! You should see: `✅ ML Model loaded successfully!`

## Step 3: Start Mobile App (Terminal 2)

```bash
cd mobile-app
npm start
```

## Step 4: Choose Your Platform

After running `npm start`, you'll see options:

- **Press `i`** - Open iOS Simulator (macOS only)
- **Press `a`** - Open Android Emulator
- **Press `w`** - Open in Web Browser
- **Scan QR code** - Open on your phone with Expo Go app

## For Physical Device (iPhone/Android)

1. Install **Expo Go** app:
   - iOS: App Store
   - Android: Play Store

2. Make sure phone and Mac are on **same Wi-Fi**

3. In Expo Go:
   - Tap **"Enter URL manually"**
   - Paste the `exp://` URL from terminal
   - Tap **"Connect"**

## Test the App

1. Fill in the form:
   - Select crop type
   - Enter area, soil properties, nutrients
   - Use "Current Location" for weather data
   - Or enter temperature, rainfall, humidity manually

2. Tap **"Predict Yield"**

3. See results with:
   - Predicted yield
   - Confidence level
   - Recommendations
   - Risk factors

## Troubleshooting

### "Could not connect to server"
- Make sure ML service is running (Terminal 1)
- Check it's on `http://localhost:8000`

### "EMFILE: too many open files" (macOS)
```bash
ulimit -n 65536
npm start
```

### App won't load
```bash
npx expo start -c  # Clear cache
```

## That's It! 🎉

Your app should now work on iOS, Android, and Web!




