import { NextRequest, NextResponse } from 'next/server'

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Forward request to Python ML service
    const response = await fetch(`${ML_SERVICE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'ML service error' }))
      console.error('ML service error:', errorData)
      return NextResponse.json(
        { error: errorData.detail || 'Failed to generate prediction' },
        { status: response.status }
      )
    }

    const prediction = await response.json()
    return NextResponse.json(prediction)
  } catch (error) {
    console.error('Prediction error:', error)
    
    // Check if ML service is running
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          error: 'ML service is not available. Please ensure the Python ML service is running on port 8000.',
          detail: 'Run: cd ml_service && python main.py'
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    )
  }
}

