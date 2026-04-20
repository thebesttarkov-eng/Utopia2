import { useEffect, useRef } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Feature } from 'geojson'
import { useSub } from '../context/SubContext'

const marks = [
  { text: 'A5', top: '18%', left: '10%' },
  { text: 'A5', top: '18%', right: '10%' },
  { text: 'A5', top: '49%', left: '10%' },
  { text: 'A5', top: '49%', right: '10%' },
  { text: 'B1', top: '32%', left: '33%' },
  { text: 'B1', top: '32%', right: '33%' },
  { text: 'B1', top: '62%', left: '33%' },
  { text: 'B1', top: '62%', right: '33%' },
] as const

const plusClusters = [
  { top: '25%', left: '12%', angle: 42 },
  { top: '25%', right: '12%', angle: -42 },
  { bottom: '21%', left: '12%', angle: -42 },
  { bottom: '21%', right: '12%', angle: 42 },
] as const

export function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const animationRef = useRef<number | undefined>(undefined)
  const mountedRef = useRef(true)
  const { active, location } = useSub()

  const width = 300
  const height = 300

  useEffect(() => {
    mountedRef.current = true
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderBaseGlobe = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = 'rgba(26,26,26,0.72)'
      ctx.strokeStyle = 'rgba(255,255,255,0.28)'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 112, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.lineWidth = 0.6
      for (let i = -3; i <= 3; i += 1) {
        ctx.beginPath()
        ctx.ellipse(width / 2, height / 2, 112, 112 * Math.cos((i * Math.PI) / 10), 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      for (let i = -3; i <= 3; i += 1) {
        ctx.beginPath()
        ctx.ellipse(width / 2, height / 2, 112 * Math.cos((i * Math.PI) / 10), 112, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    renderBaseGlobe()

    const loadAndRender = async () => {
      try {
        const CACHE_KEY = 'utopia:world-atlas-110m:v2'
        let world: Topology
        const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null

        if (cached) {
          world = JSON.parse(cached) as Topology
        } else {
          if (!navigator.onLine) {
            return
          }
          const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
          if (!response.ok) {
            throw new Error(`World atlas request failed: ${response.status}`)
          }
          const text = await response.text()
          world = JSON.parse(text) as Topology
          try { localStorage.setItem(CACHE_KEY, text) } catch { /* quota */ }
        }

        if (!mountedRef.current) return

        const countries = feature(world, world.objects.countries as GeometryCollection) as FeatureCollection
        const sphere = { type: 'Sphere' as const }
        const graticule = geoGraticule()()

        const projection = geoOrthographic()
          .scale(140)
          .translate([width / 2, height / 2])
          .clipAngle(90)

        const path = geoPath(projection, ctx)

        let activeCountryId: string | number | null = null
        let activeFeature: Feature | undefined
        if (active && location?.countryCode) {
          activeFeature = countries.features.find((f: Feature) => {
            const props = f.properties as { iso_a2?: string } | null
            return props?.iso_a2 === location.countryCode
          })
          activeCountryId = activeFeature?.id ?? null
        }

        const inactiveFeatures = activeCountryId === null
          ? countries.features
          : countries.features.filter(f => f.id !== activeCountryId)

        const draw = () => {
          ctx.clearRect(0, 0, width, height)

          ctx.fillStyle = 'rgba(26,26,26,0.86)'
          ctx.strokeStyle = 'rgba(255,255,255,0.10)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          path(sphere)
          ctx.fill()
          ctx.stroke()

          ctx.strokeStyle = 'rgba(255,255,255,0.12)'
          ctx.lineWidth = 0.5
          ctx.globalAlpha = 0.5
          ctx.beginPath()
          path(graticule)
          ctx.stroke()
          ctx.globalAlpha = 0.9

          ctx.fillStyle = 'rgba(42,42,42,0.88)'
          ctx.strokeStyle = '#FFFFFF'
          ctx.lineWidth = 0.5
          for (const f of inactiveFeatures) {
            ctx.beginPath()
            path(f)
            ctx.fill()
            ctx.stroke()
          }

          if (activeFeature) {
            ctx.fillStyle = '#3A3A3A'
            ctx.lineWidth = 1
            ctx.beginPath()
            path(activeFeature)
            ctx.fill()
            ctx.stroke()
          }

          ctx.globalAlpha = 1
        }

        const targetFrameMs = 33
        let lastFrameTime = 0

        const animate = (now: number) => {
          if (!mountedRef.current) return
          const elapsed = now - lastFrameTime
          if (elapsed >= targetFrameMs) {
            const delta = lastFrameTime === 0 ? 1 : elapsed / 16.67
            lastFrameTime = now
            rotationRef.current += 0.2 * delta
            projection.rotate([rotationRef.current, -10, 0])
            draw()
          }
          animationRef.current = requestAnimationFrame(animate)
        }

        if (prefersReducedMotion) {
          projection.rotate([rotationRef.current, -10, 0])
          draw()
        } else {
          animationRef.current = requestAnimationFrame(animate)
        }
      } catch {
        renderBaseGlobe()
      }
    }

    loadAndRender()

    return () => {
      mountedRef.current = false
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [active, location])

  return (
    <div className="utopia-grid-scene" aria-hidden="true">
      <div className="utopia-grid-scene__grid" />
      <div className="utopia-grid-scene__fog utopia-grid-scene__fog--left" />
      <div className="utopia-grid-scene__fog utopia-grid-scene__fog--right" />
      <div className="utopia-grid-scene__scan" />
      <div className="utopia-grid-scene__grain" />

      {marks.map((mark, index) => (
        <span
          key={`${mark.text}-${index}`}
          className="utopia-grid-scene__mark"
          style={mark}
        >
          {mark.text}
        </span>
      ))}

      {plusClusters.map((cluster, clusterIndex) => (
        <div
          key={clusterIndex}
          className="utopia-grid-scene__cluster"
          style={{
            ...cluster,
            transform: `rotate(${cluster.angle}deg)`,
          }}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>+</span>
          ))}
        </div>
      ))}

      <div className="utopia-grid-scene__cross">
        <span />
        <span />
      </div>

      <canvas
        ref={canvasRef}
        className="utopia-grid-scene__globe"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />

      <div className="utopia-grid-scene__meta utopia-grid-scene__meta--left">
        AE ONLY<br />MRPH_TST_03
      </div>
      <div className="utopia-grid-scene__meta utopia-grid-scene__meta--right">
        UTOPIA.XYZ
      </div>

      <div className="utopia-grid-scene__fade" />
    </div>
  )
}
