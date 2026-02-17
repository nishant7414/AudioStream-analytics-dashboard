import { useState, useEffect } from 'react'
import {
  filterData,
  getTotalUsers,
  getDAUTrend,
  getAverageListeningTime,
  getRetentionRate,
  getTopShows,
  getNewVsReturning,
  getListeningTimeByDevice,
  getFunnelData,
  getInsights,
} from './utils/analytics'
import { DEVICE_TYPES, USER_TYPES } from './data/types'
import { KPICards } from './components/KPICards'
import { DAUTrendChart } from './components/DAUTrendChart'
import { TopShowsChart } from './components/TopShowsChart'
import { NewVsReturningChart } from './components/NewVsReturningChart'
import { DeviceTimeChart } from './components/DeviceTimeChart'
import { FunnelChart } from './components/FunnelChart'
import { Insights } from './components/Insights'
import { Filters } from './components/Filters'
import { ThemeToggle } from './components/ThemeToggle'

function getMAUFromData(data) {
  if (!data.length) return 0
  const months = {}
  data.forEach((r) => {
    const m = r.date.slice(0, 7)
    months[m] = months[m] || new Set()
    months[m].add(r.user_id)
  })
  const lastMonth = Object.keys(months).sort().pop()
  return lastMonth ? months[lastMonth].size : 0
}

function getDAUFromData(data) {
  if (!data.length) return 0
  const lastDate = [...new Set(data.map((r) => r.date))].sort().pop()
  return new Set(data.filter((r) => r.date === lastDate).map((r) => r.user_id)).size
}

export default function App() {
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [deviceType, setDeviceType] = useState('all')
  const [userType, setUserType] = useState('all')

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Data file not found. Run: npm run generate-data')
        return res.json()
      })
      .then((data) => {
        setRawData(data)
        if (data.length && !dateFrom && !dateTo) {
          const dates = [...new Set(data.map((r) => r.date))].sort()
          setDateFrom(dates[0])
          setDateTo(dates[dates.length - 1])
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filterData(rawData, {
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    deviceType: deviceType === 'all' ? undefined : deviceType,
    userType: userType === 'all' ? undefined : userType,
  })

  const totalUsers = getTotalUsers(filtered)
  const dau = getDAUFromData(filtered)
  const mau = getMAUFromData(filtered)
  const avgListening = getAverageListeningTime(filtered)
  const retention = getRetentionRate(filtered)
  const dauTrend = getDAUTrend(filtered)
  const topShows = getTopShows(filtered, 10)
  const newVsReturning = getNewVsReturning(filtered)
  const deviceTime = getListeningTimeByDevice(filtered)
  const funnelData = getFunnelData(filtered)
  const insights = getInsights(filtered)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-slate-600 dark:text-slate-400 font-display text-lg">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-md rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 p-6 text-center">
          <h2 className="font-display font-semibold text-slate-800 dark:text-slate-200 text-xl mb-2">Data not found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <p className="text-sm text-slate-500 dark:text-slate-500">In project root run: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">npm run generate-data</code></p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100">
            AudioStream Analytics
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Filters
          dateFrom={dateFrom}
          dateTo={dateTo}
          deviceType={deviceType}
          userType={userType}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onDeviceChange={setDeviceType}
          onUserTypeChange={setUserType}
          dateOptions={rawData.length ? [...new Set(rawData.map((r) => r.date))].sort() : []}
        />

        <Insights insights={insights} />

        <KPICards
          totalUsers={totalUsers}
          dau={dau}
          mau={mau}
          avgListeningTime={avgListening}
          retentionRate={retention}
        />

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-card p-4 sm:p-6">
            <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-4">DAU Trend</h3>
            <DAUTrendChart data={dauTrend} />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-card p-4 sm:p-6">
            <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-4">Top 10 Shows</h3>
            <TopShowsChart data={topShows} />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-card p-4 sm:p-6">
            <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-4">New vs Returning Users</h3>
            <NewVsReturningChart data={newVsReturning} />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-card p-4 sm:p-6">
            <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-4">Listening Time by Device</h3>
            <DeviceTimeChart data={deviceTime} />
          </div>
        </section>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-card p-4 sm:p-6">
          <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-4">Conversion Funnel</h3>
          <FunnelChart data={funnelData} />
        </div>
      </main>
    </div>
  )
}
