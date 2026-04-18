import { useEffect, useRef } from 'react'

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
  angle: number
  speed: number
  opacity: number
  pulsePhase: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      return
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const lines: Line[] = []
    const lineCount = 8

    // Создаём линии
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.3 + Math.random() * 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number
    let paused = document.hidden

    const onVisibility = () => {
      const wasPaused = paused
      paused = document.hidden
      if (wasPaused && !paused) animate()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const animate = () => {
      if (paused) return
      // Simple solid background, no animation
      ctx.fillStyle = '#0E0E0E'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#0E0E0E',
      }}
    />
  )
}
