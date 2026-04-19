import { useEffect, useRef } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Feature } from 'geojson'
import { useSub } from '../context/SubContext'

export function RotatingGlobe() {
  const svgRef = useRef<SVGSVGElement>(null)
  const rotationRef = useRef(0)
  const animationRef = useRef<number | undefined>(undefined)
  const mountedRef = useRef(true)
  const { active, location } = useSub()

  const width = 300
  const height = 300

  useEffect(() => {
    const loadAndRender = async () => {
      if (!svgRef.current) return

      console.log('[globe] Starting load...')

      try {
        const CACHE_KEY = 'utopia:world-atlas-110m:v2'
        let world: Topology
        const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null

        if (cached) {
          console.log('[globe] Using cached data')
          world = JSON.parse(cached) as Topology
        } else {
          console.log('[globe] Fetching from CDN...')
          if (!navigator.onLine) {
            console.log('[globe] Offline, showing fallback')
            renderOfflineFallback()
            return
          }
          const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
          const text = await response.text()
          world = JSON.parse(text) as Topology
          try { localStorage.setItem(CACHE_KEY, text) } catch { /* quota */ }
        }

        console.log('[globe] Data loaded, rendering...')
        const countries = feature(world, world.objects.countries as GeometryCollection) as FeatureCollection
        console.log('[globe] Countries:', countries.features.length)

        const svg = select(svgRef.current)
        svg.selectAll('*').remove()

        const projection = geoOrthographic()
          .scale(140)
          .translate([width / 2, height / 2])
          .clipAngle(90)

        const path = geoPath(projection)
        const graticule = geoGraticule()

        // Find active country by ISO code
        let activeCountryId: string | number | null = null
        if (active && location?.countryCode) {
          const found = countries.features.find((f: Feature) => {
            const props = f.properties as { iso_a2?: string } | null
            return props?.iso_a2 === location.countryCode
          })
          activeCountryId = found?.id ?? null
        }

        // Create static elements
        const sphereGroup = svg.append('g').attr('class', 'sphere-group')
        const graticuleGroup = svg.append('g').attr('class', 'graticule-group')
        const countriesGroup = svg.append('g').attr('class', 'countries-group')

        // Add sphere (ocean fill)
        sphereGroup.append('path')
          .datum({ type: 'Sphere' })
          .attr('class', 'sphere')
          .attr('fill', '#1A1A1A')
          .attr('stroke', '#3A3A3A')
          .attr('stroke-width', 1.5)

        // Add graticule
        graticuleGroup.append('path')
          .datum(graticule())
          .attr('class', 'graticule')
          .attr('fill', 'none')
          .attr('stroke', '#2A2A2A')
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.5)

        // Add countries (filled continents with white outlines)
        countriesGroup.selectAll('.country')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('fill', (d: any) => d.id === activeCountryId ? '#3A3A3A' : '#2A2A2A')
          .attr('stroke', '#FFFFFF')
          .attr('stroke-width', (d: any) => d.id === activeCountryId ? 1 : 0.5)
          .attr('opacity', 0.9)

        const animate = () => {
          if (!mountedRef.current) return

          rotationRef.current += 0.2
          projection.rotate([rotationRef.current, -10, 0])

          // Update paths
          sphereGroup.select('.sphere').attr('d', path as any)
          graticuleGroup.select('.graticule').attr('d', path as any)
          countriesGroup.selectAll('.country').attr('d', path as any)

          animationRef.current = requestAnimationFrame(animate)
        }

        console.log('[globe] Starting animation...')
        animate()
      } catch (error) {
        console.error('[globe] Failed to load:', error)
      }
    }

    loadAndRender()

    return () => {
      mountedRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (svgRef.current) {
        select(svgRef.current).selectAll('*').remove()
      }
    }
  }, [active, location])

  function renderOfflineFallback() {
    if (!svgRef.current) return
    const svg = select(svgRef.current)
    svg.selectAll('*').remove()

    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 100)
      .attr('fill', 'none')
      .attr('stroke', '#2A2A2A')
      .attr('stroke-width', 2)

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#808080')
      .attr('font-family', 'monospace')
      .attr('font-size', 12)
      .attr('letter-spacing', 1)
      .text('OFFLINE')
  }

  return (
    <div style={{
      width: '100%',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0E0E0E',
      borderRadius: 12,
      border: '1px solid #2A2A2A',
      overflow: 'hidden',
    }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: '100%',
          height: '100%',
        }}
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  )
}
