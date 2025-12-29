'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const monthlyData = [
  { month: 'Jan', yield: 3.2, rainfall: 45 },
  { month: 'Feb', yield: 3.5, rainfall: 52 },
  { month: 'Mar', yield: 3.8, rainfall: 48 },
  { month: 'Apr', yield: 4.1, rainfall: 65 },
  { month: 'May', yield: 4.3, rainfall: 78 },
  { month: 'Jun', yield: 4.5, rainfall: 85 },
]

const cropComparison = [
  { crop: 'Wheat', yield: 4.2, area: 120 },
  { crop: 'Rice', yield: 5.1, area: 95 },
  { crop: 'Corn', yield: 3.8, area: 80 },
  { crop: 'Sugarcane', yield: 6.5, area: 45 },
  { crop: 'Cotton', yield: 2.8, area: 60 },
]

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Yield Trend */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Yield Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="yield" stroke="#22c55e" strokeWidth={2} name="Yield (t/ha)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Crop Comparison */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Crop Yield Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cropComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="yield" fill="#22c55e" name="Yield (t/ha)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}












