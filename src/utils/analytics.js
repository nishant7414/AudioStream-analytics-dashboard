// Analytics computations from raw session data

export function filterData(data, { dateFrom, dateTo, deviceType, userType }) {
  return data.filter((row) => {
    const d = row.date;
    if (dateFrom && d < dateFrom) return false;
    if (dateTo && d > dateTo) return false;
    if (deviceType && deviceType !== 'all' && row.device_type !== deviceType) return false;
    if (userType && userType !== 'all' && row.user_type !== userType) return false;
    return true;
  });
}

export function getTotalUsers(data) {
  return new Set(data.map((r) => r.user_id)).size;
}

export function getDailyActiveUsers(data, date) {
  return new Set(data.filter((r) => r.date === date).map((r) => r.user_id)).size;
}

export function getDAUTrend(data) {
  const byDate = {};
  data.forEach((r) => {
    byDate[r.date] = byDate[r.date] || new Set();
    byDate[r.date].add(r.user_id);
  });
  return Object.entries(byDate)
    .map(([date, users]) => ({ date, dau: users.size }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getMAU(data, yearMonth) {
  return new Set(
    data.filter((r) => r.date.startsWith(yearMonth)).map((r) => r.user_id)
  ).size;
}

export function getMonthlyActiveUsers(data) {
  const byMonth = {};
  data.forEach((r) => {
    const month = r.date.slice(0, 7);
    byMonth[month] = byMonth[month] || new Set();
    byMonth[month].add(r.user_id);
  });
  return Object.entries(byMonth)
    .map(([month, users]) => ({ month, mau: users.size }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function getAverageListeningTime(data) {
  if (!data.length) return 0;
  const total = data.reduce((s, r) => s + r.listening_time_minutes, 0);
  return Math.round((total / data.length) * 10) / 10;
}

export function getRetentionRate(data) {
  const returning = data.filter((r) => r.user_type === 'returning').length;
  return data.length ? Math.round((returning / data.length) * 1000) / 10 : 0;
}

export function getTopShows(data, n = 10) {
  const counts = {};
  data.forEach((r) => {
    counts[r.show_name] = (counts[r.show_name] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

export function getNewVsReturning(data) {
  const new_ = data.filter((r) => r.user_type === 'new').length;
  const returning = data.filter((r) => r.user_type === 'returning').length;
  return [
    { name: 'New', value: new_, fill: '#0ea5e9' },
    { name: 'Returning', value: returning, fill: '#8b5cf6' },
  ];
}

export function getListeningTimeByDevice(data) {
  const byDevice = {};
  data.forEach((r) => {
    byDevice[r.device_type] = (byDevice[r.device_type] || 0) + r.listening_time_minutes;
  });
  return Object.entries(byDevice).map(([device, minutes]) => ({
    device: device.replace('_', ' '),
    minutes: Math.round(minutes),
  }));
}

export function getFunnelData(data) {
  const uniqueSessions = new Set(data.map((r) => r.session_id));
  const appOpen = uniqueSessions.size;
  const play = data.length;
  const completeEpisode = data.filter((r) => r.completed_episode).length;
  const returningSessions = data.filter((r) => r.user_type === 'returning').length;
  return [
    { stage: 'App Open', value: appOpen, fill: '#0ea5e9' },
    { stage: 'Play', value: play, fill: '#38bdf8' },
    { stage: 'Complete Episode', value: completeEpisode, fill: '#8b5cf6' },
    { stage: 'Return', value: returningSessions, fill: '#a78bfa' },
  ];
}

export function getInsights(data) {
  const topShows = getTopShows(data, 1);
  const avgTime = getAverageListeningTime(data);
  const retention = getRetentionRate(data);
  const totalUsers = getTotalUsers(data);
  return {
    mostPopularShow: topShows[0]?.name || '—',
    averageListeningTime: avgTime,
    retentionRate: retention,
    totalUsers,
  };
}
