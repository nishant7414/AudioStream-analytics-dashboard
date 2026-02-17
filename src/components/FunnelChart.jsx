import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function FunnelChart({ data }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1)
  const withWidth = data.map((d) => ({
    ...d,
    widthPct: (d.value / maxVal) * 100,
  }))
  return (
    <div className="h-72 sm:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={withWidth}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 120, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-600" />
          <XAxis type="number" tick={{ fontSize: 11, fill: 'currentColor' }} />
          <YAxis
            type="category"
            dataKey="stage"
            width={115}
            tick={{ fontSize: 11, fill: 'currentColor' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
            }}
            formatter={(value) => [value, 'Count']}
          />
          <Bar dataKey="value" name="Count" radius={[0, 4, 4, 0]}>
            {withWidth.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
