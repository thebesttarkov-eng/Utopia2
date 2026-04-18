import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Star, Shield, ChevronRight } from 'lucide-react'
import { useSub, type Plan } from '../context/SubContext'

const G     = '#39D353'
const GDim  = 'rgba(57,211,83,0.55)'
const MUTED = '#3A5A3A'
const TEXT  = '#D4EDD4'
const TEXT2 = '#7AAA7A'
const BG_CARD = 'rgba(8,22,8,0.97)'

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: BG_CARD,
  backdropFilter: 'blur(24px)',
  border: `1px solid rgba(57,211,83,0.22)`,
  boxShadow: '0 0 20px rgba(57,211,83,0.08), inset 0 0 32px rgba(57,211,83,0.03)',
  borderRadius: 18,
  ...extra,
})

// Цены за 1 устройство (1 мес, 3 мес, 6 мес, 12 мес)
const BASE = [199, 499, 949, 1699]
// Скидки по числу устройств (1,2,3,5,7,10)
const DEVICES = [1, 2, 3, 5, 7, 10]
const DISCOUNT = [0, 0.15, 0.20, 0.25, 0.30, 0.35]

const PLANS = [
  { label: '1 мес',    months: 1,  idx: 0, popular: false },
  { label: '3 месяца', months: 3,  idx: 1, popular: false },
  { label: '6 месяцев',months: 6,  idx: 2, popular: true  },
  { label: '1 год',    months: 12, idx: 3, popular: false },
]

function calcPrice(baseIdx: number, devIdx: number) {
  const base = BASE[baseIdx]
  const disc = DISCOUNT[devIdx]
  const total = Math.round(base * DEVICES[devIdx] * (1 - disc))
  const perMonth = Math.round(total / PLANS[baseIdx].months)
  return { total, perMonth }
}

const PLAN_KEYS: Plan[] = ['1m', '3m', '6m', '12m']

export default function SubScreen() {
  const [devIdx, setDevIdx]   = useState(0)
  const [planIdx, setPlanIdx] = useState(2)
  const { activate } = useSub()
  const navigate = useNavigate()

  const devices  = DEVICES[devIdx]
  const discount = Math.round(DISCOUNT[devIdx] * 100)

  return (
    <div style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div>
        <p style={{ fontSize: 10, color: GDim, fontFamily: 'monospace', letterSpacing: 2, marginBottom: 4 }}>// SUB_CONFIGURE</p>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: G, letterSpacing: -0.5, lineHeight: 1.1, textShadow: `0 0 20px ${GDim}` }}>
          ПОДПИСКА
        </h1>
        <p style={{ fontSize: 13, color: TEXT2, marginTop: 6, lineHeight: 1.5 }}>
          Выбери кол-во устройств и период — цена пересчитается автоматически
        </p>
      </div>

      {/* Device slider card */}
      <div style={glass({ padding: '16px 16px 18px' })}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(57,211,83,0.10)', border: `1px solid rgba(57,211,83,0.22)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: G, fontFamily: 'monospace' }}>{devices}</span>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>
                {devices === 1 ? 'Устройство' : devices < 5 ? 'Устройства' : 'Устройств'}
              </p>
              <p style={{ fontSize: 11, color: TEXT2, fontFamily: 'monospace' }}>ОДНОВРЕМЕННО В ПОДПИСКЕ</p>
            </div>
          </div>
          {discount > 0 && (
            <span style={{
              background: 'rgba(57,211,83,0.12)', border: `1px solid rgba(57,211,83,0.30)`,
              borderRadius: 8, padding: '4px 10px',
              fontSize: 13, fontWeight: 800, color: G, fontFamily: 'monospace',
            }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Custom slider */}
        <div style={{ position: 'relative', padding: '4px 0' }}>
          <input
            type="range"
            min={0}
            max={DEVICES.length - 1}
            step={1}
            value={devIdx}
            onChange={e => setDevIdx(Number(e.target.value))}
            style={{ width: '100%', accentColor: G, cursor: 'pointer', height: 4 }}
          />
          {/* Dots under slider */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {DEVICES.map((d, i) => (
              <span
                key={d}
                onClick={() => setDevIdx(i)}
                style={{
                  fontSize: 9, fontFamily: 'monospace', cursor: 'pointer',
                  color: i === devIdx ? G : MUTED,
                  fontWeight: i === devIdx ? 700 : 400,
                  transition: 'color 0.2s',
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features row */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { icon: Shield, text: 'NO LOGS' },
          { icon: Zap,    text: 'БЫСТРЫЙ' },
          { icon: Star,   text: 'WireGuard' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            background: 'rgba(57,211,83,0.04)', border: '1px solid rgba(57,211,83,0.10)',
            borderRadius: 12, padding: '10px 6px',
          }}>
            <Icon size={14} color={G} />
            <span style={{ fontSize: 9, fontFamily: 'monospace', color: TEXT2, letterSpacing: 0.5 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Plans grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {PLANS.map((plan, i) => {
          const { total, perMonth } = calcPrice(plan.idx, devIdx)
          const selected = planIdx === i
          return (
            <button
              key={plan.label}
              onClick={() => setPlanIdx(i)}
              style={{
                ...glass({
                  padding: '14px 14px',
                  border: selected
                    ? `1.5px solid rgba(57,211,83,0.60)`
                    : `1px solid rgba(57,211,83,0.14)`,
                  boxShadow: selected
                    ? `0 0 22px rgba(57,211,83,0.18), inset 0 0 20px rgba(57,211,83,0.06)`
                    : undefined,
                  background: selected ? 'rgba(57,211,83,0.07)' : BG_CARD,
                }),
                textAlign: 'left',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              {plan.popular && (
                <span style={{
                  position: 'absolute', top: -1, right: 10,
                  background: G, color: '#010201',
                  fontSize: 8, fontWeight: 800, fontFamily: 'monospace',
                  padding: '2px 7px', borderRadius: '0 0 6px 6px', letterSpacing: 0.5,
                }}>
                  ★ ХИТ
                </span>
              )}
              <p style={{ fontSize: 11, color: selected ? TEXT2 : MUTED, marginBottom: 6, fontFamily: 'monospace', letterSpacing: 0.3 }}>
                {plan.label.toUpperCase()}
              </p>
              <p style={{
                fontSize: 22, fontWeight: 900, color: selected ? G : TEXT,
                textShadow: selected ? `0 0 16px ${GDim}` : 'none',
                lineHeight: 1, marginBottom: 4, transition: 'all 0.2s',
                fontFamily: 'monospace',
              }}>
                {total} ₽
              </p>
              {plan.months > 1 && (
                <p style={{ fontSize: 10, color: selected ? TEXT2 : MUTED, fontFamily: 'monospace' }}>
                  {perMonth} ₽/мес
                </p>
              )}
              {plan.months === 1 && (
                <p style={{ fontSize: 10, color: selected ? TEXT2 : MUTED, fontFamily: 'monospace' }}>в месяц</p>
              )}
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <button style={{
        width: '100%',
        background: `linear-gradient(135deg, #1a6b2a, ${G})`,
        border: 'none',
        borderRadius: 16,
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: `0 0 28px rgba(57,211,83,0.30)`,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onClick={() => {
        activate(PLAN_KEYS[planIdx], DEVICES[devIdx])
        navigate('/')
      }}
      >
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: 11, color: 'rgba(1,2,1,0.7)', fontFamily: 'monospace', letterSpacing: 1, marginBottom: 2 }}>
            ОФОРМИТЬ ПОДПИСКУ
          </p>
          <p style={{ fontSize: 18, fontWeight: 900, color: '#010201', fontFamily: 'monospace' }}>
            {calcPrice(PLANS[planIdx].idx, devIdx).total} ₽
          </p>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(1,2,1,0.20)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronRight size={20} color="#010201" />
        </div>
      </button>

      <p style={{ textAlign: 'center', fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 0.5 }}>
        ОПЛАТА СБП · БЕЗОПАСНО · БЕЗ ПОДПИСКИ
      </p>

    </div>
  )
}
