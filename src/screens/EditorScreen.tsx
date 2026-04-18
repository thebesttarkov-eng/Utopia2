import { useState, useRef, useCallback } from 'react'

// ── Palette (в стиле HomeScreen) ──────────────────────────
const G      = '#FFFFFF'
const MUTED  = '#808080'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'
const ACCENT = '#D0D0D0'

const CYAN  = G
const WHITE = TEXT
const MUTED = '#808080'

/* ─── Типы элементов ─── */
type ElementType = 'planet' | 'astronaut' | 'titan' | 'tagline' | 'telemetry' | 'badge'

interface CanvasElement {
  id: ElementType
  label: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

const INITIAL_ELEMENTS: CanvasElement[] = [
  { id: 'planet',    label: 'Планета',    x: 60,  y: 60,  width: 320, height: 320, zIndex: 1 },
  { id: 'astronaut', label: 'Космонавт',  x: 230, y: 10,  width: 120, height: 135, zIndex: 3 },
  { id: 'titan',     label: 'TITAN',      x: 10,  y: 28,  width: 210, height: 58,  zIndex: 4 },
  { id: 'tagline',   label: 'Подпись',    x: 215, y: 148, width: 155, height: 22,  zIndex: 4 },
  { id: 'telemetry', label: 'Телеметрия', x: 10,  y: 108, width: 160, height: 30,  zIndex: 4 },
  { id: 'badge',     label: 'Бейдж',      x: 10,  y: 148, width: 120, height: 28,  zIndex: 4 },
]

const BANNER_W = 390
const BANNER_H = 200

/* ─── Рендер элемента на канвасе ─── */
function renderElement(el: CanvasElement, auroraG: number, auroraP: number, auroraC: number, titanText: string, taglineText: string, altV: string, spdV: string, latV: string, planetBright: number) {
  switch (el.id) {
    case 'planet':
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
          <img src="/rese.png" alt="" style={{
            width: '100%', height: '100%', objectFit: 'contain',
            filter: `brightness(${planetBright}%) saturate(1.1)`, display: 'block',
          }}/>
          <div style={{
            position: 'absolute', top: '4%', left: '8%', right: '8%', height: '35%',
            background: `
              radial-gradient(ellipse at 28% 0%, rgba(0,255,150,${auroraG/100}) 0%, transparent 55%),
              radial-gradient(ellipse at 65% 0%, rgba(80,60,255,${auroraP/100}) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 0%, rgba(0,200,255,${auroraC/100}) 0%, transparent 45%)
            `,
            mixBlendMode: 'screen', borderRadius: '50%',
          }}/>
        </div>
      )
    case 'astronaut':
      return (
        <img src="/astronaut.png.png" alt="" style={{
          width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center top',
          filter: 'brightness(0.95) contrast(1.05) drop-shadow(0 0 14px rgba(59,130,246,0.45))',
          mixBlendMode: 'screen', display: 'block', pointerEvents: 'none',
        }}/>
      )
    case 'titan':
      return (
        <div style={{
          fontFamily: '-apple-system, Helvetica Neue, sans-serif',
          fontSize: Math.round(el.height * 0.75), fontWeight: 900, color: WHITE,
          letterSpacing: Math.round(el.height * 0.12), lineHeight: 1,
          textShadow: '0 0 20px rgba(59,130,246,0.55), 0 0 60px rgba(59,130,246,0.20)',
          whiteSpace: 'nowrap', userSelect: 'none',
        }}>{titanText}</div>
      )
    case 'tagline':
      return (
        <div style={{
          fontFamily: 'monospace', fontSize: Math.round(el.height * 0.5), fontWeight: 700,
          color: 'rgba(210,235,255,0.90)', letterSpacing: 2, whiteSpace: 'nowrap',
          textShadow: '0 0 8px rgba(200,230,255,0.6)', userSelect: 'none',
        }}>{taglineText}</div>
      )
    case 'telemetry':
      return (
        <div style={{ display: 'flex', gap: 12, fontFamily: 'monospace', fontSize: Math.round(el.height * 0.28) }}>
          {[{ k: 'ALT', v: altV }, { k: 'SPD', v: spdV }, { k: 'LAT', v: latV }].map(({ k, v }) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ color: MUTED }}>{k}</span>
              <span style={{ color: CYAN, fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      )
    case 'badge':
      return (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.30)',
          borderRadius: 8, padding: '4px 10px',
          fontSize: Math.round(el.height * 0.38), color: CYAN, fontWeight: 700, whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>★ Базовый юзер</div>
      )
  }
}

/* ─── Draggable + Resizable элемент ─── */
function DraggableEl({
  el, selected, onSelect, onChange,
  children,
}: {
  el: CanvasElement
  selected: boolean
  onSelect: () => void
  onChange: (patch: Partial<CanvasElement>) => void
  children: React.ReactNode
}) {
  const dragStart = useRef<{ mx: number; my: number; x: number; y: number } | null>(null)
  const resizeStart = useRef<{ mx: number; my: number; w: number; h: number } | null>(null)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect()
    dragStart.current = { mx: e.clientX, my: e.clientY, x: el.x, y: el.y }

    const onMove = (ev: MouseEvent) => {
      if (!dragStart.current) return
      onChange({
        x: Math.max(0, dragStart.current.x + ev.clientX - dragStart.current.mx),
        y: Math.max(0, dragStart.current.y + ev.clientY - dragStart.current.my),
      })
    }
    const onUp = () => {
      dragStart.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [el.x, el.y, onChange, onSelect])

  const onResizeDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    resizeStart.current = { mx: e.clientX, my: e.clientY, w: el.width, h: el.height }

    const onMove = (ev: MouseEvent) => {
      if (!resizeStart.current) return
      onChange({
        width:  Math.max(40, resizeStart.current.w + ev.clientX - resizeStart.current.mx),
        height: Math.max(20, resizeStart.current.h + ev.clientY - resizeStart.current.my),
      })
    }
    const onUp = () => {
      resizeStart.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [el.width, el.height, onChange])

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: el.x, top: el.y,
        width: el.width, height: el.height,
        zIndex: el.zIndex,
        cursor: 'move',
        outline: selected ? `1.5px dashed ${CYAN}` : '1.5px dashed transparent',
        boxShadow: selected ? `0 0 0 1px rgba(34,211,238,0.15)` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'visible',
      }}
    >
      {children}

      {/* лейбл при выделении */}
      {selected && (
        <div style={{
          position: 'absolute', top: -18, left: 0,
          fontSize: 9, fontFamily: 'monospace', color: CYAN,
          background: 'rgba(2,5,16,0.85)', padding: '1px 5px', borderRadius: 4,
          whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>{el.label} {el.width}×{el.height}</div>
      )}

      {/* ручка ресайза */}
      {selected && (
        <div onMouseDown={onResizeDown} style={{
          position: 'absolute', right: -5, bottom: -5,
          width: 12, height: 12, borderRadius: 3,
          background: CYAN, cursor: 'se-resize',
          boxShadow: '0 0 6px rgba(34,211,238,0.6)',
        }}/>
      )}
    </div>
  )
}

/* ─── Панель свойств ─── */
function PropsPanel({ el, onChange, extra, onExtra }: {
  el: CanvasElement | null
  onChange: (patch: Partial<CanvasElement>) => void
  extra: ExtraConfig
  onExtra: (patch: Partial<ExtraConfig>) => void
}) {
  if (!el) return (
    <div style={{ padding: 16, color: MUTED, fontSize: 12, fontFamily: 'monospace', textAlign: 'center' }}>
      ← Кликни на элемент
    </div>
  )

  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: CYAN, fontFamily: 'monospace', letterSpacing: 1, marginBottom: 12 }}>
        / {el.label.toUpperCase()}
      </div>

      {/* слои */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#7A9AB8', marginBottom: 5 }}>Слой (выше = поверх)</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onChange({ zIndex: el.zIndex - 1 })} style={{
            flex: 1, padding: '5px 0', borderRadius: 7, cursor: 'pointer',
            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.20)',
            color: WHITE, fontSize: 14, fontWeight: 700,
          }}>↓</button>
          <span style={{ fontSize: 13, color: CYAN, fontFamily: 'monospace', fontWeight: 700, minWidth: 24, textAlign: 'center' }}>
            {el.zIndex}
          </span>
          <button onClick={() => onChange({ zIndex: el.zIndex + 1 })} style={{
            flex: 1, padding: '5px 0', borderRadius: 7, cursor: 'pointer',
            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.20)',
            color: WHITE, fontSize: 14, fontWeight: 700,
          }}>↑</button>
        </div>
      </div>

      <Slider label="X" value={Math.round(el.x)} min={-200} max={BANNER_W} onChange={v => onChange({ x: v })}/>
      <Slider label="Y" value={Math.round(el.y)} min={-200} max={BANNER_H} onChange={v => onChange({ y: v })}/>
      <Slider label="Ширина" value={Math.round(el.width)} min={40} max={500} onChange={v => onChange({ width: v })}/>
      <Slider label="Высота" value={Math.round(el.height)} min={20} max={500} onChange={v => onChange({ height: v })}/>

      {el.id === 'planet' && (
        <>
          <div style={{ height: 1, background: 'rgba(59,130,246,0.10)', margin: '8px 0' }}/>
          <Slider label="Яркость %" value={extra.planetBrightness} min={40} max={100} onChange={v => onExtra({ planetBrightness: v })}/>
          <Slider label="Сияние зелёный" value={extra.auroraG} min={0} max={60} onChange={v => onExtra({ auroraG: v })}/>
          <Slider label="Сияние фиолет." value={extra.auroraP} min={0} max={60} onChange={v => onExtra({ auroraP: v })}/>
          <Slider label="Сияние голубой" value={extra.auroraC} min={0} max={60} onChange={v => onExtra({ auroraC: v })}/>
        </>
      )}
      {el.id === 'titan' && (
        <>
          <div style={{ height: 1, background: 'rgba(59,130,246,0.10)', margin: '8px 0' }}/>
          <TextInput label="Текст" value={extra.titanText} onChange={v => onExtra({ titanText: v })}/>
        </>
      )}
      {el.id === 'tagline' && (
        <>
          <div style={{ height: 1, background: 'rgba(59,130,246,0.10)', margin: '8px 0' }}/>
          <TextInput label="Текст" value={extra.taglineText} onChange={v => onExtra({ taglineText: v })}/>
        </>
      )}
      {el.id === 'telemetry' && (
        <>
          <div style={{ height: 1, background: 'rgba(59,130,246,0.10)', margin: '8px 0' }}/>
          <TextInput label="ALT" value={extra.alt} onChange={v => onExtra({ alt: v })}/>
          <TextInput label="SPD" value={extra.spd} onChange={v => onExtra({ spd: v })}/>
          <TextInput label="LAT" value={extra.lat} onChange={v => onExtra({ lat: v })}/>
        </>
      )}
    </div>
  )
}

/* ─── Helpers ─── */
function Slider({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: '#7A9AB8' }}>{label}</span>
        <span style={{ fontSize: 11, color: CYAN, fontFamily: 'monospace', fontWeight: 700 }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: CYAN, cursor: 'pointer' }}
      />
    </div>
  )
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: '#7A9AB8', marginBottom: 3 }}>{label}</div>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', background: 'rgba(59,130,246,0.07)',
          border: '1px solid rgba(59,130,246,0.20)', borderRadius: 7,
          padding: '6px 9px', color: WHITE, fontSize: 12, fontFamily: 'monospace', outline: 'none',
        }}
      />
    </div>
  )
}

interface ExtraConfig {
  planetBrightness: number
  auroraG: number; auroraP: number; auroraC: number
  titanText: string
  taglineText: string
  alt: string; spd: string; lat: string
  bannerHeight: number
}

const DEFAULT_EXTRA: ExtraConfig = {
  planetBrightness: 85,
  auroraG: 28, auroraP: 22, auroraC: 18,
  titanText: 'TITAN',
  taglineText: 'Ну что, полетели',
  alt: '402KM', spd: '7.66KM/S', lat: '55.7°N',
  bannerHeight: 200,
}

/* ─── Главный экран ─── */
export default function EditorScreen() {
  const [elements, setElements] = useState<CanvasElement[]>(INITIAL_ELEMENTS)
  const [selectedId, setSelectedId] = useState<ElementType | null>(null)
  const [extra, setExtra] = useState<ExtraConfig>(DEFAULT_EXTRA)
  const [copied, setCopied] = useState(false)

  const selectedEl = elements.find(e => e.id === selectedId) ?? null

  const updateEl = useCallback((id: ElementType, patch: Partial<CanvasElement>) => {
    setElements(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e))
  }, [])

  const updateExtra = (patch: Partial<ExtraConfig>) => setExtra(prev => ({ ...prev, ...patch }))

  const reset = () => { setElements(INITIAL_ELEMENTS); setExtra(DEFAULT_EXTRA); setSelectedId(null) }

  const copy = () => {
    const layout = Object.fromEntries(elements.map(e => [e.id, { x: e.x, y: e.y, w: e.width, h: e.height }]))
    const out = JSON.stringify({ layout, extra }, null, 2)
    navigator.clipboard.writeText(out)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stars: [number, number][] = [
    [8,12],[18,55],[32,8],[45,70],[60,20],[75,45],[85,10],[92,65],[12,80],[50,38],
    [22,25],[67,78],[38,15],[80,30],[15,50],[70,5],[40,60],[88,48],[25,90],
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#010309', display: 'flex', flexDirection: 'column' }}>

      {/* ── TOOLBAR ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 18px',
        background: 'rgba(2,5,16,0.95)',
        borderBottom: '1px solid rgba(59,130,246,0.12)',
        gap: 12, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(59,130,246,0.50)', letterSpacing: 2 }}>
            ◆ EDITOR
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: WHITE }}>Редактор баннера</span>
        </div>

        {/* элементы */}
        <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {elements.map(el => (
            <button key={el.id} onClick={() => setSelectedId(el.id)} style={{
              padding: '4px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer',
              background: selectedId === el.id ? 'rgba(34,211,238,0.15)' : 'rgba(59,130,246,0.07)',
              border: `1px solid ${selectedId === el.id ? 'rgba(34,211,238,0.50)' : 'rgba(59,130,246,0.15)'}`,
              color: selectedId === el.id ? CYAN : MUTED, fontWeight: 600,
            }}>{el.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={reset} style={{
            padding: '6px 12px', borderRadius: 8, fontSize: 11, cursor: 'pointer',
            background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.18)',
            color: MUTED, fontWeight: 600,
          }}>Сброс</button>
          <button onClick={copy} style={{
            padding: '6px 14px', borderRadius: 8, fontSize: 11, cursor: 'pointer',
            background: copied ? 'rgba(34,211,238,0.15)' : 'rgba(59,130,246,0.12)',
            border: `1px solid ${copied ? 'rgba(34,211,238,0.50)' : 'rgba(59,130,246,0.25)'}`,
            color: copied ? CYAN : WHITE, fontWeight: 700,
          }}>{copied ? '✓ Скопировано' : '⎘ Скопировать'}</button>
        </div>
      </div>

      {/* ── РАБОЧАЯ ЗОНА ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* канвас */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(59,130,246,0.04) 24px, rgba(59,130,246,0.04) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(59,130,246,0.04) 24px, rgba(59,130,246,0.04) 25px)',
          padding: 32, overflow: 'auto',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>

            {/* размер баннера */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace' }}>Высота баннера:</span>
              <input type="range" min={140} max={280} value={extra.bannerHeight}
                onChange={e => updateExtra({ bannerHeight: Number(e.target.value) })}
                style={{ width: 120, accentColor: CYAN }}
              />
              <span style={{ fontSize: 10, color: CYAN, fontFamily: 'monospace', fontWeight: 700 }}>{extra.bannerHeight}px</span>
            </div>

            {/* баннер — канвас */}
            <div
              onClick={() => setSelectedId(null)}
              style={{
                position: 'relative',
                width: BANNER_W, height: extra.bannerHeight,
                borderRadius: 20, overflow: 'visible',
                background: 'radial-gradient(ellipse at 60% 50%, rgba(14,30,80,0.95) 0%, rgba(4,8,25,0.98) 100%)',
                border: '1px solid rgba(59,130,246,0.25)',
                boxShadow: '0 0 60px rgba(10,30,100,0.40), 0 0 0 1px rgba(59,130,246,0.08)',
                cursor: 'default',
                flexShrink: 0,
              }}
            >
              {/* звёзды */}
              {stars.map(([l, t], i) => (
                <div key={i} style={{
                  position: 'absolute', left: `${l}%`, top: `${t}%`,
                  width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1,
                  borderRadius: '50%',
                  background: `rgba(200,220,255,${i % 5 === 0 ? 0.7 : 0.3})`,
                  pointerEvents: 'none',
                }}/>
              ))}

              {/* элементы */}
              {elements.map(el => (
                <DraggableEl
                  key={el.id}
                  el={el}
                  selected={selectedId === el.id}
                  onSelect={() => setSelectedId(el.id)}
                  onChange={patch => updateEl(el.id, patch)}
                >
                  {renderElement(
                    el,
                    extra.auroraG, extra.auroraP, extra.auroraC,
                    extra.titanText, extra.taglineText,
                    extra.alt, extra.spd, extra.lat,
                    extra.planetBrightness,
                  )}
                </DraggableEl>
              ))}
            </div>

            {/* подсказка */}
            <div style={{ fontSize: 10, color: 'rgba(59,130,246,0.30)', fontFamily: 'monospace', textAlign: 'center' }}>
              Кликай на элемент → тащи мышкой · Голубой уголок → изменить размер
            </div>
          </div>
        </div>

        {/* панель свойств */}
        <div style={{
          width: 240, flexShrink: 0,
          background: 'rgba(2,5,16,0.95)',
          borderLeft: '1px solid rgba(59,130,246,0.12)',
          overflowY: 'auto',
        }}>
          <div style={{
            padding: '10px 14px',
            borderBottom: '1px solid rgba(59,130,246,0.10)',
            fontSize: 10, fontFamily: 'monospace',
            color: 'rgba(59,130,246,0.40)', letterSpacing: 1.5,
          }}>/ СВОЙСТВА</div>
          <PropsPanel
            el={selectedEl}
            onChange={patch => selectedEl && updateEl(selectedEl.id, patch)}
            extra={extra}
            onExtra={updateExtra}
          />
        </div>
      </div>
    </div>
  )
}
