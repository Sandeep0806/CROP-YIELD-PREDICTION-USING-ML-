'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import PredictionForm from '@/components/PredictionForm'
import PredictionResults from '@/components/PredictionResults'
import { BarChart3, TrendingUp, Leaf, Cloud } from 'lucide-react'

export default function Home() {
  const [predictionData, setPredictionData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handlePrediction = async (formData: any) => {
    setIsLoading(true)
    setError(null)
    setPredictionData(null)
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to get prediction' }))
        throw new Error(errorData.error || errorData.detail || 'Failed to generate prediction')
      }
      
      const data = await response.json()
      
      // Check if response contains error
      if (data.error) {
        throw new Error(data.error)
      }
      
      setPredictionData(data)
    } catch (error) {
      console.error('Prediction error:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate prediction. Please ensure the ML service is running.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Crop Yield Prediction</h1>
                <p className="text-sm text-gray-500">AI-Powered Agricultural Intelligence</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Predictions</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Analytics</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Predictions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Yield</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4.2t/ha</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Farms</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">342</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Leaf className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weather Score</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">8.5/10</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Cloud className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">New Prediction</h2>
            <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prediction Results</h2>
            {error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
                    <p className="text-red-800 font-medium mb-2">Error</p>
                    <p className="text-red-600 text-sm">{error}</p>
                    {error.includes('ML service') && (
                      <p className="text-red-500 text-xs mt-2">
                        Run: cd ml_service && python3 main.py
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : predictionData ? (
              <PredictionResults data={predictionData} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Submit a prediction to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Charts */}
        <div className="mt-8">
          <Dashboard />
        </div>
      </main>
    </div>
  )
}

