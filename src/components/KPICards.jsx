import React from 'react'

const cards = [
  {
    title: 'Total Users',
    valueKey: 'totalUsers',
    suffix: '',
    icon: '👥',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-200 dark:border-sky-800',
  },
  {
    title: 'Daily Active Users',
    valueKey: 'dau',
    suffix: '',
    icon: '📅',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-800',
  },
  {
    title: 'Monthly Active Users',
    valueKey: 'mau',
    suffix: '',
    icon: '📊',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
  },
  {
    title: 'Avg. Listening Time',
    valueKey: 'avgListeningTime',
    suffix: ' min',
    icon: '⏱️',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  {
    title: 'Retention Rate',
    valueKey: 'retentionRate',
    suffix: '%',
    icon: '🔄',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800',
  },
]

export function KPICards({
  totalUsers,
  dau,
  mau,
  avgListeningTime,
  retentionRate,
}) {
  const values = {
    totalUsers,
    dau,
    mau,
    avgListeningTime,
    retentionRate,
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.valueKey}
          className={`rounded-xl border ${card.border} ${card.bg} p-4 sm:p-5 shadow-card transition-shadow hover:shadow-card-hover`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {card.title}
              </p>
              <p className="mt-1 font-display font-bold text-2xl text-slate-800 dark:text-slate-100">
                {values[card.valueKey] != null ? values[card.valueKey] : '—'}
                {card.suffix}
              </p>
            </div>
            <span className="text-2xl opacity-80" aria-hidden>{card.icon}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
