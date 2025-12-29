# Crop Yield Prediction - React Native Mobile App

A cross-platform mobile application built with **React Native** and **Expo** that works on **iOS**, **Android**, and **Web**.

## Features

- 🤖 **ML-Powered Predictions**: Connect to Python ML service for accurate yield predictions
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🌍 **Location Services**: GPS-based weather data auto-fill
- 📊 **Real-time Results**: Get predictions with confidence scores and recommendations
- 💡 **Smart Recommendations**: AI-generated suggestions for optimal yield
- ⚠️ **Risk Assessment**: Identifies potential risk factors

## Prerequisites

- **Node.js 18+**
- **npm** or **yarn**
- **Expo CLI** (optional, but recommended)
- **Python 3.8+** (for ML service backend)

## Installation

### Step 1: Install Dependencies

```bash
cd mobile-app
npm install
```

### Step 2: Start ML Service (Required)

In a separate terminal:

```bash
cd ../ml_service
python3 main.py
```

The ML service should run on `http://localhost:8000`

### Step 3: Start the Mobile App

```bash
cd mobile-app
npm start
```

Then:
- Press **`i`** for iOS Simulator
- Press **`a`** for Android Emulator
- Press **`w`** for Web browser
- Scan **QR code** with Expo Go app on your phone

## Running on Different Platforms

### iOS Simulator (macOS only)

```bash
npm run ios
```

Requires Xcode to be installed.

### Android Emulator

```bash
npm run android
```

Requires Android Studio and an emulator to be set up.

### Web Browser

```bash
npm run web
```

Opens the app in your default web browser.

### Physical Device (Expo Go)

1. Install **Expo Go** app from App Store (iOS) or Play Store (Android)
2. Run `npm start`
3. Scan the QR code with Expo Go
4. Or enter the URL manually in Expo Go

## Project Structure

```
mobile-app/
├── App.tsx              # Main app component
├── app.json             # Expo configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── babel.config.js      # Babel config
```

## Configuration

### API Endpoints

The app connects to:
- **ML Service**: `http://localhost:8000` (development)
- **Weather API**: `http://localhost:3000/api/weather` (if using Next.js backend)

For physical devices, you may need to update these URLs to use your computer's IP address.

### Network Setup for Physical Devices

1. Find your Mac's IP address:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. Update URLs in `App.tsx`:
   ```typescript
   const ML_SERVICE_URL = 'http://YOUR_IP_ADDRESS:8000';
   ```

## Troubleshooting

### "Could not connect to server"

- Make sure ML service is running on port 8000
- For physical devices, ensure both devices are on the same Wi-Fi
- Use tunnel mode: `npx expo start --tunnel`

### "EMFILE: too many open files" (macOS)

```bash
ulimit -n 65536
npx expo start
```

### Location Services Not Working

- Grant location permissions when prompted
- Check iPhone Settings → Privacy → Location Services

### App Won't Load

- Clear cache: `npx expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

## Building for Production

### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Build
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

### Web

```bash
npx expo export:web
```

## Tech Stack

- **React Native** - Cross-platform framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Expo Location** - GPS services
- **Expo Vector Icons** - Icons

## License

MIT


