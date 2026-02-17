import React from 'react'

export function Insights({ insights }) {
  const items = [
    {
      label: 'Most popular show',
      value: insights?.mostPopularShow ?? '—',
      icon: '🎧',
    },
    {
      label: 'Average listening time',
      value: insights?.averageListeningTime != null ? `${insights.averageListeningTime} min` : '—',
      icon: '⏱️',
    },
    {
      label: 'Retention rate',
      value: insights?.retentionRate != null ? `${insights.retentionRate}%` : '—',
      icon: '🔄',
    },
    {
      label: 'Total unique users',
      value: insights?.totalUsers ?? '—',
      icon: '👥',
    },
  ]
  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-card p-4 sm:p-6">
      <h2 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        <span className="text-primary-500">✦</span> Auto Insights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 px-4 py-3 border border-slate-100 dark:border-slate-600"
          >
            <span className="text-xl" aria-hidden>{item.icon}</span>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="font-display font-semibold text-slate-800 dark:text-slate-100 truncate" title={String(item.value)}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
