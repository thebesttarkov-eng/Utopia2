import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'

interface GeoFeature {
  type: string
  geometry: any
  properties: any
}

function interpolateProjection(raw0: any, raw1: any) {
  const mutate: any = d3.geoProjectionMutator((t: number) => (x: number, y: number) => {
    const [x0, y0] = raw0(x, y)
    const [x1, y1] = raw1(x, y)
    return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)]
  })
  let t = 0
  return Object.assign((mutate as any)(t), {
    alpha(_: number) {
      return arguments.length ? (mutate as any)((t = +_)) : t
    },
  })
}

export function GlobeToMapTransform() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState([0])
  const [worldData, setWorldData] = useState<GeoFeature[]>([])
  const [rotation, setRotation] = useState([0, 0])
  const [translation] = useState([0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState([0, 0])

  const width = 800
  const height = 500

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const CACHE_KEY = 'utopia:world-atlas-110m:v2'
        const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null
        let world: any
        if (cached) {
          world = JSON.parse(cached)
        } else {
          const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
          const text = await response.text()
          world = JSON.parse(text)
          try { localStorage.setItem(CACHE_KEY, text) } catch { /* quota */ }
        }
        const fc = feature(world, world.objects.countries) as any
        setWorldData(fc.features as GeoFeature[])
      } catch (error) {
        console.log('[globe2] Error loading world data:', error)
      }
    }
    loadWorldData()
  }, [])

  const getPoint = (event: React.MouseEvent | React.TouchEvent) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return [0, 0]
    if ('touches' in event) {
      const t = event.touches[0] ?? event.changedTouches[0]
      return [t.clientX - rect.left, t.clientY - rect.top]
    }
    return [event.clientX - rect.left, event.clientY - rect.top]
  }

  const handleDown = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    setLastMouse(getPoint(event))
  }

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const current = getPoint(event)
    const dx = current[0] - lastMouse[0]
    const dy = current[1] - lastMouse[1]
    const t = progress[0] / 100
    const sensitivity = t < 0.5 ? 0.5 : 0.25
    setRotation((prev) => [
      prev[0] + dx * sensitivity,
      Math.max(-90, Math.min(90, prev[1] - dy * sensitivity)),
    ])
    setLastMouse(current)
  }

  const handleUp = () => setIsDragging(false)

  useEffect(() => {
    if (!svgRef.current || worldData.length === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const t = progress[0] / 100
    const alpha = Math.pow(t, 0.5)

    const scale = d3.scaleLinear().domain([0, 1]).range([200, 120])

    const projection = interpolateProjection(d3.geoOrthographicRaw, d3.geoEquirectangularRaw)
      .scale(scale(alpha))
      .translate([width / 2 + translation[0], height / 2 + translation[1]])
      .rotate([rotation[0], rotation[1]])
      .precision(0.1)

    projection.alpha(alpha)

    const path = d3.geoPath(projection)

    try {
      const graticule = d3.geoGraticule()
      const gPath = path(graticule())
      if (gPath) {
        svg.append('path')
          .datum(graticule())
          .attr('d', gPath)
          .attr('fill', 'none')
          .attr('stroke', '#cccccc')
          .attr('stroke-width', 1)
          .attr('opacity', 0.2)
      }
    } catch { /* noop */ }

    svg.selectAll('.country')
      .data(worldData)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', (d) => {
        try {
          const s = path(d as any)
          if (!s || s.includes('NaN') || s.includes('Infinity')) return ''
          return s
        } catch { return '' }
      })
      .attr('fill', 'none')
      .attr('stroke', '#cccccc')
      .attr('stroke-width', 1)
      .attr('opacity', 1)

    try {
      const sphere = path({ type: 'Sphere' } as any)
      if (sphere) {
        svg.append('path')
          .datum({ type: 'Sphere' })
          .attr('d', sphere)
          .attr('fill', 'none')
          .attr('stroke', '#222222')
          .attr('stroke-width', 1)
      }
    } catch { /* noop */ }
  }, [worldData, progress, rotation, translation])

  const handleAnimate = () => {
    if (isAnimating) return
    setIsAnimating(true)
    const start = progress[0]
    const end = start === 0 ? 100 : 0
    const duration = 2000
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const tt = Math.min(elapsed / duration, 1)
      const eased = tt < 0.5 ? 2 * tt * tt : -1 + (4 - 2 * tt) * tt
      setProgress([start + (end - start) * eased])
      if (tt < 1) requestAnimationFrame(animate)
      else setIsAnimating(false)
    }
    animate()
  }

  const handleReset = () => setRotation([0, 0])

  const btnBase: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: 13,
    fontFamily: 'inherit',
    cursor: 'pointer',
    border: '1px solid #2A2A2A',
    background: '#1A1A1A',
    color: '#fff',
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 320,
      background: '#0E0E0E',
      borderRadius: 12,
      border: '1px solid #2A2A2A',
      overflow: 'hidden',
    }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: '100%', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={handleDown}
        onTouchMove={handleMove}
        onTouchEnd={handleUp}
      />
      <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: 8, zIndex: 10 }}>
        <button onClick={handleAnimate} disabled={isAnimating} style={{ ...btnBase, opacity: isAnimating ? 0.6 : 1 }}>
          {isAnimating ? 'Animating…' : progress[0] === 0 ? 'Unroll' : 'Roll'}
        </button>
        <button onClick={handleReset} style={btnBase}>Reset</button>
      </div>
    </div>
  )
}
