import { NextRequest, NextResponse } from 'next/server'

// Indian city average weather data (seasonal averages)
const INDIAN_CITY_WEATHER: { [key: string]: { temperature: number; rainfall: number; humidity: number } } = {
  // Major cities - Kharif season averages (June-September)
  'Mumbai': { temperature: 28.5, rainfall: 2200, humidity: 78 },
  'Delhi': { temperature: 30.2, rainfall: 700, humidity: 65 },
  'Bangalore': { temperature: 24.8, rainfall: 970, humidity: 72 },
  'Hyderabad': { temperature: 27.5, rainfall: 750, humidity: 68 },
  'Ahmedabad': { temperature: 29.8, rainfall: 800, humidity: 70 },
  'Chennai': { temperature: 30.5, rainfall: 1400, humidity: 75 },
  'Kolkata': { temperature: 29.2, rainfall: 1600, humidity: 80 },
  'Pune': { temperature: 26.5, rainfall: 1600, humidity: 70 },
  'Jaipur': { temperature: 31.5, rainfall: 650, humidity: 60 },
  'Lucknow': { temperature: 30.8, rainfall: 1000, humidity: 72 },
  'Kanpur': { temperature: 31.2, rainfall: 950, humidity: 68 },
  'Nagpur': { temperature: 29.5, rainfall: 1200, humidity: 70 },
  'Indore': { temperature: 28.8, rainfall: 1000, humidity: 68 },
  'Bhopal': { temperature: 29.0, rainfall: 1200, humidity: 70 },
  'Visakhapatnam': { temperature: 29.5, rainfall: 1000, humidity: 75 },
  'Patna': { temperature: 30.5, rainfall: 1100, humidity: 75 },
  'Vadodara': { temperature: 29.5, rainfall: 900, humidity: 72 },
  'Coimbatore': { temperature: 26.5, rainfall: 700, humidity: 70 },
  'Vijayawada': { temperature: 30.0, rainfall: 900, humidity: 72 },
  'Jodhpur': { temperature: 32.5, rainfall: 350, humidity: 55 },
  'Madurai': { temperature: 30.0, rainfall: 850, humidity: 70 },
  'Raipur': { temperature: 29.8, rainfall: 1300, humidity: 75 },
  'Kota': { temperature: 31.0, rainfall: 700, humidity: 65 },
  'Guwahati': { temperature: 28.5, rainfall: 1800, humidity: 80 },
  'Chandigarh': { temperature: 29.5, rainfall: 900, humidity: 68 },
  'Mysore': { temperature: 25.5, rainfall: 800, humidity: 72 },
  'Bhubaneswar': { temperature: 29.8, rainfall: 1500, humidity: 78 },
  'Kochi': { temperature: 27.5, rainfall: 3000, humidity: 85 },
  'Dehradun': { temperature: 26.5, rainfall: 2000, humidity: 75 },
  'Gurgaon': { temperature: 30.5, rainfall: 750, humidity: 65 },
  'Noida': { temperature: 30.8, rainfall: 750, humidity: 65 },
}

// Default weather for unknown cities (average Indian conditions)
const DEFAULT_WEATHER = { temperature: 28.5, rainfall: 1000, humidity: 70 }

interface WeatherRequest {
  city?: string
  latitude?: number
  longitude?: number
}

export async function POST(request: NextRequest) {
  try {
    const body: WeatherRequest = await request.json()
    
    let weatherData
    
    if (body.city) {
      // Get weather by city name
      const cityName = body.city.trim()
      const normalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase()
      
      weatherData = INDIAN_CITY_WEATHER[normalizedCity] || DEFAULT_WEATHER
      
      // If exact match not found, try to find similar city
      if (!INDIAN_CITY_WEATHER[normalizedCity]) {
        const similarCity = Object.keys(INDIAN_CITY_WEATHER).find(
          city => city.toLowerCase().includes(normalizedCity.toLowerCase()) ||
                 normalizedCity.toLowerCase().includes(city.toLowerCase())
        )
        if (similarCity) {
          weatherData = INDIAN_CITY_WEATHER[similarCity]
        }
      }
    } else if (body.latitude && body.longitude) {
      // Get weather by coordinates (simplified - in production, use actual weather API)
      // For now, return default based on latitude (north vs south India)
      if (body.latitude > 20) {
        // North India
        weatherData = { temperature: 30.0, rainfall: 800, humidity: 65 }
      } else {
        // South India
        weatherData = { temperature: 28.0, rainfall: 1200, humidity: 75 }
      }
    } else {
      return NextResponse.json(
        { error: 'Either city name or coordinates must be provided' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      city: body.city || 'Current Location',
      temperature: Math.round(weatherData.temperature * 10) / 10,
      rainfall: Math.round(weatherData.rainfall),
      humidity: Math.round(weatherData.humidity),
      source: 'Indian City Weather Database'
    })
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  
  try {
    let weatherData
    
    if (city) {
      const normalizedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
      weatherData = INDIAN_CITY_WEATHER[normalizedCity] || DEFAULT_WEATHER
    } else if (lat && lon) {
      const latitude = parseFloat(lat)
      if (latitude > 20) {
        weatherData = { temperature: 30.0, rainfall: 800, humidity: 65 }
      } else {
        weatherData = { temperature: 28.0, rainfall: 1200, humidity: 75 }
      }
    } else {
      return NextResponse.json(
        { error: 'Either city name or coordinates must be provided' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      city: city || 'Current Location',
      temperature: Math.round(weatherData.temperature * 10) / 10,
      rainfall: Math.round(weatherData.rainfall),
      humidity: Math.round(weatherData.humidity),
      source: 'Indian City Weather Database'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}










