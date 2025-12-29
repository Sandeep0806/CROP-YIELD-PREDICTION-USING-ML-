'use client'

import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react'

interface PredictionResultsProps {
  data: {
    predictedYield: number
    confidence: number
    recommendations: string[]
    riskFactors: string[]
  }
}

export default function PredictionResults({ data }: PredictionResultsProps) {
  const getYieldColor = (yieldValue: number) => {
    if (yieldValue >= 4.5) return 'text-green-600'
    if (yieldValue >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500'
    if (confidence >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Predicted Yield */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Predicted Yield</h3>
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className={`text-4xl font-bold ${getYieldColor(data.predictedYield)}`}>
            {data.predictedYield.toFixed(2)}
          </span>
          <span className="text-gray-600 font-medium">tons/hectare</span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Confidence Level</span>
            <span className="text-sm font-semibold text-gray-700">{data.confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getConfidenceColor(data.confidence)}`}
              style={{ width: `${data.confidence}%` } as React.CSSProperties & { width: string }}
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-700">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-blue-600 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Factors */}
      {data.riskFactors && data.riskFactors.length > 0 && (
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-700">Risk Factors</h3>
          </div>
          <ul className="space-y-2">
            {data.riskFactors.map((risk, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-orange-600 mt-1">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Yield Comparison */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Yield Comparison</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Industry Average</span>
            <span className="text-sm font-semibold text-gray-700">3.8 t/ha</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Your Prediction</span>
            <span className={`text-sm font-semibold ${getYieldColor(data.predictedYield)}`}>
              {data.predictedYield.toFixed(2)} t/ha
            </span>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Difference</span>
              <span
                className={`text-sm font-bold ${
                  data.predictedYield >= 3.8 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {data.predictedYield >= 3.8 ? (
                  <span className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{((data.predictedYield - 3.8) * 100) / 3.8}%
                  </span>
                ) : (
                  <span className="flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    {((data.predictedYield - 3.8) * 100) / 3.8}%
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

