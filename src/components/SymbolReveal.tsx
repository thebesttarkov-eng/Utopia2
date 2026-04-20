import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/.'
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]
const obfuscate = (t: string) => t.replace(/\S/g, randomChar)

export function SymbolReveal({ text, duration = 520 }: { text: string; duration?: number }) {
  const [value, setValue] = useState(() => obfuscate(text))

  useEffect(() => {
    let frame = 0
    let raf = 0
    const totalFrames = Math.max(1, Math.round(duration / 32))

    const tick = () => {
      frame += 1
      const progress = frame / totalFrames
      const next = text.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index / text.length < progress) return char
        return randomChar()
      }).join('')
      setValue(next)
      if (frame < totalFrames) raf = window.requestAnimationFrame(tick)
      else setValue(text)
    }

    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [text, duration])

  return <>{value}</>
}
