import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import L from 'leaflet'
import useEarthquakeData from '../hooks/useEarthquakeData'

const MarkerIcon = (magnitude) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="background:${magnitude >= 5 ? "red" : magnitude >= 3 ? 'yellow' : 'green'};width:${Math.max(
      8,
      magnitude * 5
    )}px;height:${Math.max(8, magnitude * 5)}px;border-radius:50%;opacity:0.75;border:2px solid white;box-shadow:0 0 6px rgba(0,0,0,0.3);"></div>`
  })

function FitWorldOnFirstLoad() {
  const map = useMap()
  if (!map._fitDone) {
    map._fitDone = true
    map.setView([20, 0], 2)
  }
  return null
}

export default function EarthquakeMap({ minMagnitude = 0, range = 'day', dark = false, showHeatmap = false }) {
  const { data, loading, error } = useEarthquakeData(range)

  const filtered = data.filter((f) => (f.properties?.mag ?? 0) >= minMagnitude)

  if (loading) {
    return <div className="h-[calc(100vh-72px)] flex items-center justify-center">Loading earthquakes…</div>
  }
  if (error) {
    return (
      <div className="h-[calc(100vh-72px)] flex items-center justify-center text-red-600">
        Failed to load earthquakes. Please try again.
      </div>
    )
  }

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: 'calc(100vh - 72px)', width: '100%' }}>
      <FitWorldOnFirstLoad />
      <TileLayer
        url={
          dark
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
        attribution={
          dark
            ? '&copy; OpenStreetMap contributors & CARTO'
            : '&copy; OpenStreetMap contributors'
        }
      />
      {showHeatmap
        ? filtered.map((eq) => {
            const [lng, lat] = eq.geometry.coordinates
            const magnitude = eq.properties?.mag ?? 0
            const radius = Math.max(5000, magnitude * 15000)
            const color = magnitude >= 5 ? '#ef4444' : magnitude >= 3 ? '#f59e0b' : '#22c55e'
            return (
              <Circle
                key={`h-${eq.id}`}
                center={[lat, lng]}
                radius={radius}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.25, opacity: 0.4 }}
              />
            )
          })
        : null}
      {filtered.map((eq) => {
        const [lng, lat, depth] = eq.geometry.coordinates
        const magnitude = eq.properties?.mag ?? 0
        return (
          <Marker key={eq.id} position={[lat, lng]} icon={MarkerIcon(magnitude)}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{eq.properties?.place}</div>
                <div>Magnitude: {magnitude}</div>
                <div>Depth: {depth} km</div>
                <div>Time: {new Date(eq.properties?.time).toLocaleString()}</div>
                {eq.properties?.url ? (
                  <a
                    className="text-blue-600 underline"
                    href={eq.properties.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Details
                  </a>
                ) : null}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}


