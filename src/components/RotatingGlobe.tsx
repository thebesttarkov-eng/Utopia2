import { useEffect, useRef, useState } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Feature } from 'geojson'
import { useSub } from '../context/SubContext'

// 50 популярных стран (ISO alpha-2)
const ALL_COUNTRIES = [
  'US', 'GB', 'DE', 'FR', 'NL', 'JP', 'AU', 'CA', 'IT', 'ES',
  'SE', 'NO', 'DK', 'FI', 'CH', 'AT', 'BE', 'PL', 'CZ', 'PT',
  'IE', 'NZ', 'SG', 'HK', 'KR', 'TW', 'IN', 'BR', 'MX', 'AR',
  'CL', 'CO', 'PE', 'ZA', 'EG', 'IL', 'AE', 'SA', 'TR', 'GR',
  'RO', 'BG', 'HU', 'HR', 'RS', 'UA', 'BY', 'LT', 'LV', 'EE'
]

// Выбираем 10 случайных стран для подсветки
function getRandomCountries(count: number = 10): string[] {
  const shuffled = [...ALL_COUNTRIES].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function RotatingGlobe() {
  const svgRef = useRef<SVGSVGElement>(null)
  const rotationRef = useRef(0)
  const animationRef = useRef<number | undefined>(undefined)
  const mountedRef = useRef(true)
  const { active, location } = useSub()

  // Случайные страны для подсветки
  const [glowingCountries] = useState(() => getRandomCountries(10))

  const width = 300
  const height = 300

  useEffect(() => {
    const loadAndRender = async () => {
      if (!svgRef.current) return

      try {
        const CACHE_KEY = 'utopia:world-atlas-110m:v3'
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

        // Find active country
        let activeCountryId: string | number | null = null
        if (active && location?.countryCode) {
          const found = countries.features.find((f: Feature) => {
            const props = f.properties as { iso_a2?: string } | null
            return props?.iso_a2 === location.countryCode
          })
          activeCountryId = found?.id ?? null
        }

        // Создаём SVG группу для анимации
        const defs = svg.append('defs')

        // Glow filter для фиолетовых стран
        const filter = defs.append('filter')
          .attr('id', 'purple-glow')
          .attr('x', '-50%')
          .attr('y', '-50%')
          .attr('width', '200%')
          .attr('height', '200%')

        filter.append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '3')
          .attr('result', 'blur')

        filter.append('feMerge')
          .selectAll('feMergeNode')
          .data(['blur', 'SourceGraphic'])
          .enter()
          .append('feMergeNode')
          .attr('in', d => d)

        const sphereGroup = svg.append('g').attr('class', 'sphere-group')
        const graticuleGroup = svg.append('g').attr('class', 'graticule-group')
        const countriesGroup = svg.append('g').attr('class', 'countries-group')
        const glowGroup = svg.append('g').attr('class', 'glow-group')

        // Add sphere
        sphereGroup.append('path')
          .datum({ type: 'Sphere' })
          .attr('fill', 'none')
          .attr('stroke', '#222222')
          .attr('stroke-width', 1)

        // Add graticule
        graticuleGroup.append('path')
          .datum(graticule())
          .attr('fill', 'none')
          .attr('stroke', '#cccccc')
          .attr('stroke-width', 1)
          .attr('opacity', 0.15)

        // Non-glowing countries (plain gray)
        countriesGroup.selectAll('.country-base')
          .data(countries.features.filter(f => {
            const props = f.properties as { iso_a2?: string } | null
            const iso = props?.iso_a2
            // Исключаем активную страну и страны для подсветки
            return f.id !== activeCountryId && !(iso && glowingCountries.includes(iso))
          }))
          .enter()
          .append('path')
          .attr('class', 'country-base')
          .attr('fill', 'none')
          .attr('stroke', '#888888')
          .attr('stroke-width', 0.8)
          .attr('opacity', 0.6)

        // Glowing countries (purple with pulse)
        glowGroup.selectAll('.country-glow')
          .data(countries.features.filter(f => {
            const props = f.properties as { iso_a2?: string } | null
            const iso = props?.iso_a2
            return f.id !== activeCountryId && iso && glowingCountries.includes(iso)
          }))
          .enter()
          .append('path')
          .attr('class', 'country-glow')
          .attr('fill', 'none')
          .attr('stroke', '#9333EA')
          .attr('stroke-width', 1.5)
          .attr('filter', 'url(#purple-glow)')
          .attr('opacity', 0.9)

        // Active country (white, glowing)
        if (activeCountryId) {
          const activeCountry = countries.features.find(f => f.id === activeCountryId)
          if (activeCountry) {
            glowGroup.append('path')
              .datum(activeCountry)
              .attr('class', 'country-active')
              .attr('fill', 'none')
              .attr('stroke', '#FFFFFF')
              .attr('stroke-width', 2)
              .attr('filter', 'url(#purple-glow)')
              .attr('opacity', 1)
          }
        }

        const animate = () => {
          if (!mountedRef.current) return

          // Медленное вращение
          rotationRef.current += 0.15
          projection.rotate([rotationRef.current, -10, 0])

          // Обновляем пути
          sphereGroup.select('path').attr('d', path as any)
          graticuleGroup.select('path').attr('d', path as any)
          countriesGroup.selectAll('.country-base').attr('d', path as any)
          glowGroup.selectAll('.country-glow').attr('d', path as any)
          glowGroup.select('.country-active')?.attr('d', path as any)

          // Пульсация opacity для эффекта свечения
          const pulse = 0.6 + Math.sin(Date.now() / 500) * 0.4
          glowGroup.selectAll('.country-glow').attr('opacity', pulse)
          glowGroup.select('.country-active')?.attr('opacity', pulse)

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
  }, [active, location, glowingCountries])

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