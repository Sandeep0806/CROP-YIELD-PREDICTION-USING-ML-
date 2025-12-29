'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, Loader2 } from 'lucide-react'

interface PredictionFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export default function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    cropType: 'wheat',
    area: '',
    soilPh: '',
    soilMoisture: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    rainfall: '',
    humidity: '',
    season: 'kharif',
  })
  
  const [location, setLocation] = useState('')
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [indianCities, setIndianCities] = useState<string[]>([])

  // Load Indian cities list
  useEffect(() => {
    fetch('/data/indian_cities.json')
      .then(res => res.json())
      .then(data => setIndianCities(data))
      .catch(() => {
        // Fallback cities if file not found
        setIndianCities([
          'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
          'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam',
          'Surat', 'Thane', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
          'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Amritsar', 'Aurangabad',
          'Dhanbad', 'Noida', 'Jabalpur', 'Gwalior', 'Coimbatore', 'Vijayawada', 'Jodhpur',
          'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli', 'Mysore',
          'Tiruchirappalli', 'Bareilly', 'Aligarh', 'Tiruppur', 'Gurgaon', 'Moradabad', 'Jalandhar',
          'Bhubaneswar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur',
          'Bikaner', 'Amravati', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad', 'Kochi', 'Nellore',
          'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer',
          'Akola', 'Gulbarga', 'Jamnagar', 'Udaipur', 'Loni', 'Jhansi', 'Ulhasnagar', 'Jammu',
          'Sangli', 'Belgaum', 'Mangalore', 'Ambattur', 'Teni', 'Malegaon', 'Gaya', 'Jalgaon',
          'Ujjain', 'Maheshtala', 'Davanagere', 'Kozhikode', 'Kurnool', 'Rajahmundry', 'Bokaro',
          'South Dumdum', 'Bellary', 'Patiala', 'Gopalpur', 'Agartala', 'Bhagalpur', 'Muzaffarnagar',
          'Bhatpara', 'Panihati', 'Latur', 'Dhule', 'Rohtak', 'Korba', 'Bhilwara', 'Brahmapur',
          'Muzaffarpur', 'Ahmednagar', 'Mathura', 'Kollam', 'Avadi', 'Kadapa', 'Kamareddy',
          'Sangareddy', 'Suryapet', 'Karimnagar', 'Nizamabad', 'Adilabad', 'Mancherial', 'Ramagundam',
          'Khammam', 'Mahbubnagar', 'Nalgonda', 'Miryalaguda', 'Siddipet', 'Jagtial', 'Peddapalli',
          'Nirmal', 'Bhongir', 'Medak', 'Zaheerabad'
        ])
      })
  }, [])

  // Handle clicks outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
    
    if (value.length > 0) {
      const filtered = indianCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10)
      setLocationSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setLocationSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleLocationSelect = async (city: string) => {
    setLocation(city)
    setShowSuggestions(false)
    await fetchWeatherByCity(city)
  }

  const fetchWeatherByCity = async (city: string) => {
    if (!city) return
    
    setIsLoadingWeather(true)
    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setFormData({
          ...formData,
          temperature: data.temperature.toString(),
          rainfall: data.rainfall.toString(),
          humidity: data.humidity.toString(),
        })
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error)
    } finally {
      setIsLoadingWeather(false)
    }
  }

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch('/api/weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          })
          
          if (response.ok) {
            const data = await response.json()
            setLocation('Current Location')
            setFormData({
              ...formData,
              temperature: data.temperature.toString(),
              rainfall: data.rainfall.toString(),
              humidity: data.humidity.toString(),
            })
          }
        } catch (error) {
          console.error('Failed to fetch weather:', error)
        } finally {
          setIsGettingLocation(false)
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert('Unable to get your location. Please enter a city name instead.')
        setIsGettingLocation(false)
      }
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location-based Weather Auto-fill */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <MapPin className="inline h-4 w-4 mr-1" />
          Location-based Weather Data
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore...)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {showSuggestions && locationSuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
              >
                {locationSuggestions.map((city, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleLocationSelect(city)}
                    className="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleCurrentLocation}
            disabled={isGettingLocation || isLoadingWeather}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            title="Use current location"
          >
            {isGettingLocation ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Current Location</span>
          </button>
        </div>
        {isLoadingWeather && (
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Fetching weather data...
          </p>
        )}
        {location && !isLoadingWeather && (
          <p className="text-xs text-green-600 mt-2">
            ✓ Weather data auto-filled for {location}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Crop Type
          </label>
          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            aria-label="Crop Type"
            required
          >
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="corn">Corn</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="cotton">Cotton</option>
            <option value="soybean">Soybean</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area (hectares)
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="e.g., 10"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soil pH
          </label>
          <input
            type="number"
            name="soilPh"
            value={formData.soilPh}
            onChange={handleChange}
            placeholder="6.0 - 7.5"
            step="0.1"
            min="4"
            max="9"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soil Moisture (%)
          </label>
          <input
            type="number"
            name="soilMoisture"
            value={formData.soilMoisture}
            onChange={handleChange}
            placeholder="40 - 60"
            step="0.1"
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nitrogen (kg/ha)
          </label>
          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            placeholder="50 - 150"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phosphorus (kg/ha)
          </label>
          <input
            type="number"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            placeholder="20 - 80"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Potassium (kg/ha)
          </label>
          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            placeholder="30 - 100"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature (°C)
            {location && formData.temperature && (
              <span className="ml-2 text-xs text-green-600 font-normal">(Auto-filled)</span>
            )}
          </label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="20 - 35"
            step="0.1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              location && formData.temperature ? 'border-green-300 bg-green-50' : 'border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rainfall (mm)
            {location && formData.rainfall && (
              <span className="ml-2 text-xs text-green-600 font-normal">(Auto-filled)</span>
            )}
          </label>
          <input
            type="number"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            placeholder="500 - 1500"
            step="0.1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              location && formData.rainfall ? 'border-green-300 bg-green-50' : 'border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Humidity (%)
            {location && formData.humidity && (
              <span className="ml-2 text-xs text-green-600 font-normal">(Auto-filled)</span>
            )}
          </label>
          <input
            type="number"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            placeholder="50 - 80"
            step="0.1"
            min="0"
            max="100"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              location && formData.humidity ? 'border-green-300 bg-green-50' : 'border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Season
          </label>
          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            aria-label="Season"
            required
          >
            <option value="kharif">Kharif</option>
            <option value="rabi">Rabi</option>
            <option value="zaid">Zaid</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
      >
        {isLoading ? 'Predicting...' : 'Predict Yield'}
      </button>
    </form>
  )
}

