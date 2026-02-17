import React from 'react'
import { DEVICE_TYPES, USER_TYPES } from '../data/types'

export function Filters({
  dateFrom,
  dateTo,
  deviceType,
  userType,
  onDateFromChange,
  onDateToChange,
  onDeviceChange,
  onUserTypeChange,
  dateOptions,
}) {
  const deviceOptions = ['all', ...DEVICE_TYPES]
  const userTypeOptions = ['all', ...USER_TYPES]
  return (
    <section className="flex flex-wrap items-end gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-card">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label htmlFor="dateFrom" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            From
          </label>
          <select
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm min-w-[140px] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All</option>
            {dateOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateTo" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            To
          </label>
          <select
            id="dateTo"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm min-w-[140px] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All</option>
            {dateOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="device" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Device
          </label>
          <select
            id="device"
            value={deviceType}
            onChange={(e) => onDeviceChange(e.target.value)}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm min-w-[130px] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {deviceOptions.map((d) => (
              <option key={d} value={d}>{d === 'all' ? 'All' : d.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            User type
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => onUserTypeChange(e.target.value)}
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm min-w-[120px] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {userTypeOptions.map((u) => (
              <option key={u} value={u}>{u === 'all' ? 'All' : u}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
