import { useEffect, useRef, useMemo } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Feature } from 'geojson'
import { useSub } from '../context/SubContext'

// 50 популярных стран
const ALL_COUNTRIES = [
  'US', 'GB', 'DE', 'FR', 'NL', 'JP', 'AU', 'CA', 'IT', 'ES',
  'SE', 'NO', 'DK', 'FI', 'CH', 'AT', 'BE', 'PL', 'CZ', 'PT',
  'IE', 'NZ', 'SG', 'HK', 'KR', 'TW', 'IN', 'BR', 'MX', 'AR',
  'CL', 'CO', 'PE', 'ZA', 'EG', 'IL', 'AE', 'SA', 'TR', 'GR',
  'RO', 'BG', 'HU', 'HR', 'RS', 'UA', 'BY', 'LT', 'LV', 'EE'
]

const PURPLE = '#A855F7' // Ярче фиолетовый
const WHITE = '#FFFFFF'
const GRAY = '#444444'
const PURPLE_FILL = 'rgba(168, 85, 247, 0.15)' // Полупрозрачный для fill

export function RotatingGlobe() {
  const svgRef = useRef<SVGSVGElement>(null)
  const rotationRef = useRef(0)
  const animationRef = useRef<number | undefined>(undefined)
  const mountedRef = useRef(true)
  const { active, location } = useSub()

  // 10 случайных стран для подсветки (фиксированные)
  const glowingCountries = useMemo(() => {
    const shuffled = [...ALL_COUNTRIES].sort(() => 0.5 - Math.random())
    return new Set(shuffled.slice(0, 10))
  }, [])

  const width = 300
  const height = 300

  useEffect(() => {
    let isCancelled = false

    const loadAndRender = async () => {
      if (!svgRef.current || isCancelled) return

      try {
        const CACHE_KEY = 'utopia:world-atlas-110m:v4'
        let world: Topology

        if (typeof localStorage !== 'undefined') {
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            world = JSON.parse(cached)
          } else {
            if (!navigator.onLine) return
            const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            const text = await response.text()
            world = JSON.parse(text)
            try { localStorage.setItem(CACHE_KEY, text) } catch { /* ignore */ }
          }
        } else {
          return
        }

        if (isCancelled || !svgRef.current) return

        const countries = feature(world, world.objects.countries as GeometryCollection) as FeatureCollection

        const svg = select(svgRef.current)
        svg.selectAll('*').remove()

        const projection = geoOrthographic()
          .scale(140)
          .translate([width / 2, height / 2])
          .clipAngle(90)

        const path = geoPath(projection)
        const graticule = geoGraticule()

        // Найти активную страну
        let activeCountryId: string | number | null = null
        if (active && location?.countryCode) {
          const found = countries.features.find((f: Feature) => {
            const props = f.properties as { iso_a2?: string } | null
            return props?.iso_a2 === location.countryCode
          })
          activeCountryId = found?.id ?? null
        }

        // Все страны
        const sphere = svg.append('path')
          .datum({ type: 'Sphere' })
          .attr('fill', 'none')
          .attr('stroke', '#222222')
          .attr('stroke-width', 1)

        const grid = svg.append('path')
          .datum(graticule())
          .attr('fill', 'none')
          .attr('stroke', '#444444')
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.3)

        // Отрисовка стран
        svg.selectAll('.country')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('fill', (d: any) => {
            const props = d.properties as { iso_a2?: string } | null
            const iso = props?.iso_a2
            if (d.id === activeCountryId) return 'rgba(255,255,255,0.2)'
            if (iso && glowingCountries.has(iso)) return PURPLE_FILL
            return 'rgba(100,100,100,0.1)'
          })
          .attr('stroke-linejoin', 'round')
          .on('mouseover', function() {
            select(this).attr('stroke-width', 2)
          })
          .on('mouseout', function(_, d: any) {
            const props = d.properties as { iso_a2?: string } | null
            const iso = props?.iso_a2

            if (d.id === activeCountryId) {
              select(this).attr('stroke-width', 2.5)
            } else if (iso && glowingCountries.has(iso)) {
              select(this).attr('stroke-width', 2)
            } else {
              select(this).attr('stroke-width', 0.8)
            }
          })

        const animate = () => {
          if (!mountedRef.current || isCancelled) return

          rotationRef.current += 0.2
          projection.rotate([rotationRef.current, -15, 0])

          sphere.attr('d', path as any)
          grid.attr('d', path as any)

          // Обновляем страны
          svg.selectAll('.country')
            .attr('d', path as any)
            .attr('stroke', (d: any) => {
              const props = d.properties as { iso_a2?: string } | null
              const iso = props?.iso_a2

              if (d.id === activeCountryId) return WHITE
              if (iso && glowingCountries.has(iso)) return PURPLE
              return GRAY
            })
            .attr('stroke-width', (d: any) => {
              if (d.id === activeCountryId) return 2.5
              const props = d.properties as { iso_a2?: string } | null
              if (props?.iso_a2 && glowingCountries.has(props.iso_a2)) return 1.5
              return 0.8
            })
            .attr('opacity', (d: any) => {
              if (d.id === activeCountryId) return 1
              const props = d.properties as { iso_a2?: string } | null
              if (props?.iso_a2 && glowingCountries.has(props.iso_a2)) return 1
              return 0.5
            })

          // Пульсация для фиолетовых
          const pulse = 0.7 + Math.sin(Date.now() / 400) * 0.3
          svg.selectAll('.country').each(function(d: any) {
            const props = d.properties as { iso_a2?: string } | null
            if (props?.iso_a2 && glowingCountries.has(props.iso_a2)) {
              select(this).attr('opacity', pulse)
            }
          })

          animationRef.current = requestAnimationFrame(animate)
        }

        animate()
      } catch (error) {
        console.error('[globe] Error:', error)
      }
    }

    loadAndRender()

    return () => {
      mountedRef.current = false
      isCancelled = true
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active, location, glowingCountries])

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
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  )
}