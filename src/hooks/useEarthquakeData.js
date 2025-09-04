import { useEffect, useState } from 'react'

function buildFeedUrl(range) {
  // range: 'day' | 'week' | 'month'
  const suffix = range === 'week' ? 'all_week' : range === 'month' ? 'all_month' : 'all_day'
  return `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${suffix}.geojson`
}

export default function useEarthquakeData(range = 'day') {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    setError(null)

    fetch(buildFeedUrl(range))
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((json) => {
        if (isCancelled) return
        setData(Array.isArray(json?.features) ? json.features : [])
        setLoading(false)
      })
      .catch((err) => {
        if (isCancelled) return
        setError(err)
        setLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [range])

  return { data, loading, error }
}


