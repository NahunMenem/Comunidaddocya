'use client'

import { useEffect, useRef } from 'react'

const MARKERS = [
  { lat: -34.6037, lng: -58.3816, label: 'CABA / GBA', active: true  },
  { lat: -32.9442, lng: -60.6505, label: 'Rosario',     active: false },
  { lat: -31.4135, lng: -64.1811, label: 'Córdoba',     active: false },
  { lat: -32.8908, lng: -68.8272, label: 'Mendoza',     active: false },
  { lat: -26.8083, lng: -65.2176, label: 'Tucumán',     active: false },
]

export default function MapLeaflet() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (mountedRef.current || !containerRef.current) return
    mountedRef.current = true

    let map: any = null

    async function init() {
      // Lazy import — runs only in browser, never on server
      const L = (await import('leaflet')).default

      // Leaflet CSS — must be injected after import
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Fix broken default icon paths in bundlers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (!containerRef.current) return

      map = L.map(containerRef.current, {
        center: [-34.6, -58.8],
        zoom: 6,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      })

      // CartoDB Dark tiles
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map)

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19, opacity: 0.45 }
      ).addTo(map)

      // CABA/GBA coverage circle
      L.circle([-34.6037, -58.3816], {
        radius: 35000,
        color: '#14b8a6',
        fillColor: '#14b8a6',
        fillOpacity: 0.1,
        weight: 1.5,
        opacity: 0.6,
      }).addTo(map)

      // Inject custom styles once
      if (!document.getElementById('leaflet-docya-style')) {
        const style = document.createElement('style')
        style.id = 'leaflet-docya-style'
        style.textContent = `
          @keyframes leaflet-pulse {
            0%   { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(3); opacity: 0; }
          }
          .leaflet-docya-tooltip {
            background: rgba(10,20,30,0.95) !important;
            border: 1px solid rgba(20,184,166,0.45) !important;
            color: #fff !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            padding: 4px 10px !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 16px rgba(0,0,0,0.6) !important;
            white-space: nowrap !important;
          }
          .leaflet-docya-tooltip::before {
            border-top-color: rgba(20,184,166,0.45) !important;
          }
        `
        document.head.appendChild(style)
      }

      // Markers
      MARKERS.forEach(({ lat, lng, label, active }) => {
        const size = active ? 14 : 10
        const html = active
          ? `<div style="position:relative;width:${size}px;height:${size}px;">
               <div style="position:absolute;inset:0;border-radius:50%;background:#14b8a6;border:2px solid #fff;box-shadow:0 0 10px rgba(20,184,166,0.7);"></div>
               <div style="position:absolute;top:-3px;left:-3px;width:20px;height:20px;border-radius:50%;border:1.5px solid #14b8a6;animation:leaflet-pulse 2s ease-out infinite;"></div>
             </div>`
          : `<div style="width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.1);border:1.5px dashed rgba(255,255,255,0.3);"></div>`

        const icon = L.divIcon({
          html,
          className: '',
          iconSize:   [size, size],
          iconAnchor: [size / 2, size / 2],
        })

        L.marker([lat, lng], { icon })
          .bindTooltip(label, {
            permanent: false,
            direction: 'top',
            offset: [0, -10],
            className: 'leaflet-docya-tooltip',
          })
          .addTo(map)
      })
    }

    init()

    return () => {
      map?.remove()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
