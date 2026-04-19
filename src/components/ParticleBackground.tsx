import { useEffect, useRef } from 'react'

// Интерфейс частицы
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

// Интерфейс мыши
interface Mouse {
  x: number
  y: number
  isActive: boolean
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const mouse: Mouse = { x: 0, y: 0, isActive: false }
    
    // Настройки
    const PARTICLE_COUNT = 60 // Количество точек
    const CONNECTION_DIST = 150 // Дистанция для линий
    const MOUSE_RADIUS = 200 // Радиус реакции на мышь

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Скорость X
          vy: (Math.random() - 0.5) * 0.8, // Скорость Y
          size: Math.random() * 2 + 1,
        })
      }
    }

    // Обработчики мыши/тача
    const handleMove = (e: MouseEvent | TouchEvent) => {
      mouse.isActive = true
      if ('touches' in e) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
      } else {
        mouse.x = e.clientX
        mouse.y = e.clientY
      }
    }
    
    const handleEnd = () => { mouse.isActive = false }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchend', handleEnd)
    
    resize()

    const animate = () => {
      ctx.fillStyle = '#0E0E0E' // Очистка фона
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Обновляем и рисуем частицы
      particles.forEach((p, i) => {
        // Движение
        p.x += p.vx
        p.y += p.vy

        // Отскок от стен
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Реакция на мышь (эффект гравитации/отталкивания)
        if (mouse.isActive) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            // Притягиваем чуть-чуть
            p.x += dx * force * 0.05
            p.y += dy * force * 0.05
          }
        }

        // Рисуем точку
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fill()

        // Рисуем линии (соединения)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / CONNECTION_DIST)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
        
        // Линии к мыши
        if (mouse.isActive) {
            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < MOUSE_RADIUS) {
                ctx.beginPath()
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - dist / MOUSE_RADIUS)})`
                ctx.lineWidth = 0.8
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(mouse.x, mouse.y)
                ctx.stroke()
            }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none', // Пропускаем клики сквозь канвас
      }}
    />
  )
}
