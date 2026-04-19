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

      try {
        const CACHE_KEY = 'utopia:world-atlas-110m:v2'
        let world: Topology
        const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null

        if (cached) {
          world = JSON.parse(cached) as Topology
        } else {
          if (!navigator.onLine) {
            renderOfflineFallback()
            return
          }
          const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
          const text = await response.text()
          world = JSON.parse(text) as Topology
          try { localStorage.setItem(CACHE_KEY, text) } catch { /* quota */ }
        }

        const countries = feature(world, world.objects.countries as GeometryCollection) as FeatureCollection

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

        const sphereGroup = svg.append('g').attr('class', 'sphere-group')
        const graticuleGroup = svg.append('g').attr('class', 'graticule-group')
        const countriesGroup = svg.append('g').attr('class', 'countries-group')

        // Add sphere
        sphereGroup.append('path')
          .datum({ type: 'Sphere' })
          .attr('class', 'sphere')
          .attr('fill', 'none')
          .attr('stroke', '#222222')
          .attr('stroke-width', 1)

        // Add graticule
        graticuleGroup.append('path')
          .datum(graticule())
          .attr('class', 'graticule')
          .attr('fill', 'none')
          .attr('stroke', '#cccccc')
          .attr('stroke-width', 1)
          .attr('opacity', 0.2)

        // Add countries
        countriesGroup.selectAll('.country')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('fill', 'none')
          .attr('stroke', (d: any) => {
            // Active country = white
            if (d.id === activeCountryId) return '#FFFFFF'
            // Others = gray
            return '#cccccc'
          })
          .attr('stroke-width', (d: any) => d.id === activeCountryId ? 2 : 1)
          .attr('opacity', 1)

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