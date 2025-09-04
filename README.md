# Earthquake Visualiser

A web application for visualizing recent earthquake data on an interactive map.

## Features

- Displays earthquake locations and magnitudes on a world map
- Fetches live data from USGS Earthquake API
- Filter earthquakes by magnitude and time range
- Interactive popups with earthquake details

## Tech Stack

- React
- Vite
- Leaflet (via React Leaflet)
- Tailwind CSS

## Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Start the development server**
   ```sh
   npm run dev
   ```

3. **Build for production**
   ```sh
   npm run build
   ```

## Project Structure

- `src/` — Source code
  - `App.jsx` — Main application component
  - `components/` — Reusable UI components
  - `hooks/` — Custom React hooks
- `public/` — Static assets

## Data Source

Earthquake data is fetched from [USGS GeoJSON Feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).