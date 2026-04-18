import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection } from 'geojson'

export function RotatingGlobe() {
  const svgRef = useRef<SVGSVGElement>(null)
  const rotationRef = useRef(0)
  const animationRef = useRef<number | undefined>(undefined)

  const width = 300
  const height = 300

  useEffect(() => {
    const loadAndRender = async () => {
      if (!svgRef.current) return

      try {
        // Load world data
        const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        const world = await response.json() as Topology
        const countries = feature(world, world.objects.countries as GeometryCollection) as FeatureCollection

        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()

        const projection = d3.geoOrthographic()
          .scale(140)
          .translate([width / 2, height / 2])
          .clipAngle(90)

        const path = d3.geoPath(projection)

        // Add sphere background
        svg.append('path')
          .datum({ type: 'Sphere' })
          .attr('d', path as any)
          .attr('fill', '#1A1A1A')
          .attr('stroke', '#3A3A3A')
          .attr('stroke-width', 1.5)

        // Add graticule
        const graticule = d3.geoGraticule()
        svg.append('path')
          .datum(graticule())
          .attr('d', path as any)
          .attr('fill', 'none')
          .attr('stroke', '#2A2A2A')
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.5)

        // Add countries
        const countriesGroup = svg.append('g')
        countriesGroup.selectAll('.country')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', path as any)
          .attr('fill', '#2A2A2A')
          .attr('stroke', '#FFFFFF')
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.9)

        // Animation loop
        const animate = () => {
          rotationRef.current += 0.2
          projection.rotate([rotationRef.current, -10, 0])

          countriesGroup.selectAll('.country')
            .attr('d', path as any)

          svg.select('.graticule')
            .attr('d', path as any)

          animationRef.current = requestAnimationFrame(animate)
        }

        animate()
      } catch (error) {
        console.error('Failed to load globe data:', error)
      }
    }

    loadAndRender()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

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
