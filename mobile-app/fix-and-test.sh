#!/bin/bash

# Complete fix and test script

echo "🔧 Fixing React Native App..."
echo ""

cd /Users/sandeeepkokkonda/Desktop/crope/mobile-app

# Step 1: Test with minimal app
echo "Step 1: Testing with minimal app..."
cp App.tsx App.tsx.backup
cp App.minimal.tsx App.tsx

echo "✅ Using minimal test app"
echo ""

# Step 2: Clean everything
echo "Step 2: Cleaning caches..."
rm -rf .expo
rm -rf node_modules/.cache
rm -rf .expo-shared
echo "✅ Caches cleared"
echo ""

# Step 3: Reinstall if needed
if [ ! -d "node_modules" ]; then
    echo "Step 3: Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Step 4: Start Expo
echo "Step 4: Starting Expo..."
echo ""
echo "📱 Next steps:"
echo "   1. Wait for QR code/URL"
echo "   2. Open Expo Go on your phone"
echo "   3. Enter URL manually"
echo "   4. You should see a green screen with 'App is working!'"
echo ""
echo "If you see the green screen, the app works!"
echo "Then we can restore the full app."
echo ""

npx expo start --clear



