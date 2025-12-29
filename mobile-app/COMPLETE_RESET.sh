#!/bin/bash

# Complete reset and fix script

echo "🔄 Complete Reset and Fix"
echo ""

cd /Users/sandeeepkokkonda/Desktop/crope/mobile-app

echo "Step 1: Removing old files..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf .expo
rm -rf .expo-shared
rm -rf node_modules/.cache
echo "✅ Cleaned"
echo ""

echo "Step 2: Installing dependencies..."
npm install --legacy-peer-deps
echo "✅ Installed"
echo ""

echo "Step 3: Starting Expo..."
echo ""
echo "📱 Ready to test!"
echo "   - Press 'i' for iOS"
echo "   - Press 'a' for Android"
echo "   - Press 'w' for Web"
echo ""

npx expo start --clear



