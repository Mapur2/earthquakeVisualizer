import { useMemo, useState } from 'react'
import './App.css'
import EarthquakeMap from './components/EarthquakeMap'

function App() {
  const [minMagnitude, setMinMagnitude] = useState(0)
  const [range, setRange] = useState('day')
  const [dark, setDark] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(false)

  const headerTitle = useMemo(() => 'Earthquake Visualizer', [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 shadow-md bg-white z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-semibold">{headerTitle}</h1>
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label htmlFor="range" className="text-sm font-medium">Range</label>
              <select
                id="range"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="day">Past Day</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
              </select>
            </div>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-sm">
              <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
              Dark map
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-sm">
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={(e) => setShowHeatmap(e.target.checked)}
              />
              Heatmap
            </label>
            <label htmlFor="mag" className="text-sm font-medium">Min magnitude: {minMagnitude}</label>
            <input
              id="mag"
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={minMagnitude}
              onChange={(e) => setMinMagnitude(Number(e.target.value))}
              className="w-48"
            />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <EarthquakeMap minMagnitude={minMagnitude} range={range} dark={dark} showHeatmap={showHeatmap} />
      </main>
    </div>
  )
}

export default App
