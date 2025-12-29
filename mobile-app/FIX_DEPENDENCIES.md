# Fix Dependency Conflicts

## The Problem

`react-native-web` is causing dependency conflicts. **Good news:** Expo SDK 54 handles web support automatically, so we don't need it!

## ✅ Solution

### Step 1: Remove react-native-web

It's already removed from package.json. Now clean install:

```bash
cd /Users/sandeeepkokkonda/Desktop/crope/mobile-app

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Install with correct versions
npm install
```

### Step 2: Use Expo's Built-in Web Support

Expo SDK 54 has web support built-in! Just run:

```bash
npx expo start --web
```

No need for react-native-web!

---

## If You Still Get Errors

### Use Legacy Peer Deps

```bash
npm install --legacy-peer-deps
```

This ignores peer dependency conflicts.

---

## Verify Installation

After installing, check:

```bash
npm list expo react react-native
```

Should show compatible versions.

---

## Summary

- ✅ Removed `react-native-web` (not needed for Expo)
- ✅ Expo SDK 54 handles web automatically
- ✅ Just run `npm install` and it should work

The web support is built into Expo - no extra packages needed!



