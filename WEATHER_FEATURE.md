# Location-Based Weather Data Feature

## Overview

The Crop Yield Prediction System now includes automatic weather data population based on location. Users can either:
1. Enter a city name (with autocomplete for Indian cities)
2. Use their current location via GPS

## Features

### 1. City Name Input with Autocomplete
- Type any Indian city name
- Autocomplete suggestions appear as you type
- Supports 100+ major Indian cities
- Click on a suggestion to select

### 2. Current Location Detection
- Click "Current Location" button
- Uses browser's Geolocation API
- Automatically fetches weather for your coordinates
- Requires user permission for location access

### 3. Auto-Fill Weather Fields
When a location is selected, the following fields are automatically populated:
- **Temperature** (°C)
- **Rainfall** (mm)
- **Humidity** (%)

These fields are highlighted in green to indicate they've been auto-filled.

## Supported Cities

The system includes weather data for major Indian cities including:
- Mumbai, Delhi, Bangalore, Hyderabad, Ahmedabad, Chennai, Kolkata
- Pune, Jaipur, Lucknow, Kanpur, Nagpur, Indore, Bhopal
- And 90+ more cities across India

## Weather Data Source

Currently uses average seasonal weather data for Indian cities:
- **Kharif Season**: June-September averages
- Based on historical climate data
- Temperature, rainfall, and humidity values

## API Endpoints

### GET/POST `/api/weather`
Fetches weather data for a location.

**Request:**
```json
{
  "city": "Mumbai"
}
```
or
```json
{
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

**Response:**
```json
{
  "city": "Mumbai",
  "temperature": 28.5,
  "rainfall": 2200,
  "humidity": 78,
  "source": "Indian City Weather Database"
}
```

## Usage

1. **Enter City Name:**
   - Start typing a city name in the location field
   - Select from autocomplete suggestions
   - Weather data auto-fills

2. **Use Current Location:**
   - Click the "Current Location" button (navigation icon)
   - Allow location access when prompted
   - Weather data auto-fills based on your coordinates

3. **Manual Override:**
   - You can still manually edit temperature, rainfall, and humidity fields
   - Auto-filled fields are highlighted but editable

## Technical Implementation

- **Frontend**: React component with autocomplete and geolocation
- **Backend**: Next.js API route (`/api/weather`)
- **Data**: Indian cities list in JSON format
- **Weather Data**: Pre-populated database of city weather averages

## Future Enhancements

- Integration with real-time weather APIs (OpenWeatherMap, WeatherAPI)
- Historical weather data for better accuracy
- Seasonal adjustments based on selected season
- Weather forecast integration
- Multiple location support for comparison

## Files Modified/Created

1. `components/PredictionForm.tsx` - Added location input and weather auto-fill
2. `app/api/weather/route.ts` - Weather API endpoint
3. `public/data/indian_cities.json` - List of Indian cities
4. `data/indian_cities.json` - Backup cities list



