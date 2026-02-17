import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b']

export function DeviceTimeChart({ data }) {
  const chartData = data.map((d, i) => ({ ...d, fill: COLORS[i % COLORS.length] }))
  return (
    <div className="h-72 sm:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-600" />
          <XAxis
            dataKey="device"
            tick={{ fontSize: 11, fill: 'currentColor' }}
          />
          <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
            }}
            formatter={(value) => [value, 'Minutes']}
          />
          <Bar dataKey="minutes" name="Listening (min)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
