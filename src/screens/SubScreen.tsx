import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Star, Shield, ChevronRight } from 'lucide-react'
import { useSub, type Plan } from '../context/SubContext'
import { useLang } from '../i18n/LangContext'

// ── Palette (в точности как HomeScreen) ───────────────────
const G     = '#FFFFFF'
const MUTED = '#808080'
const TEXT  = '#FFFFFF'
const TEXT2 = '#B0B0B0'
const AMBER = '#D0D0D0'

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: 'rgba(26, 26, 26, 0.85)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  borderRadius: 12,
  ...extra,
})

// Цены за 1 устройство (1 мес, 3 мес, 6 мес, 12 мес)
const BASE = [199, 499, 949, 1699]
const DEVICES = [1, 2, 3, 5, 7, 10]
const DISCOUNT = [0, 0.15, 0.20, 0.25, 0.30, 0.35]

const PLAN_DEFS = [
  { labelRu: '1 мес',     labelEn: '1 mo',   months: 1,  idx: 0, popular: false },
  { labelRu: '3 месяца',  labelEn: '3 mo',   months: 3,  idx: 1, popular: false },
  { labelRu: '6 месяцев', labelEn: '6 mo',   months: 6,  idx: 2, popular: true  },
  { labelRu: '1 год',     labelEn: '1 yr',   months: 12, idx: 3, popular: false },
]

function calcPrice(baseIdx: number, devIdx: number) {
  const base = BASE[baseIdx]
  const disc = DISCOUNT[devIdx]
  const total = Math.round(base * DEVICES[devIdx] * (1 - disc))
  const perMonth = Math.round(total / PLAN_DEFS[baseIdx].months)
  return { total, perMonth }
}

const PLAN_KEYS: Plan[] = ['1m', '3m', '6m', '12m']

export default function SubScreen() {
  const { lang } = useLang()
  const [devIdx, setDevIdx]   = useState(0)
  const [planIdx, setPlanIdx] = useState(2)
  const { activate } = useSub()
  const navigate = useNavigate()

  const devices  = DEVICES[devIdx]
  const discount = Math.round(DISCOUNT[devIdx] * 100)
  const currentTotal = calcPrice(PLAN_DEFS[planIdx].idx, devIdx).total

  const deviceWord = (n: number) => {
    if (lang === 'en') return n === 1 ? 'Device' : 'Devices'
    return n === 1 ? 'Устройство' : n < 5 ? 'Устройства' : 'Устройств'
  }

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Compact header (в стиле HomeScreen) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
            // UTOPIA.PLAN
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT, letterSpacing: -0.2, marginTop: 2 }}>
            {lang === 'ru' ? 'Подписка' : 'Subscription'}
          </h1>
        </div>
        {discount > 0 && (
          <span style={{
            background: '#2A2A2A',
            border: `1px solid #3A3A3A`,
            borderRadius: 20, padding: '4px 10px',
            fontSize: 10, color: TEXT, fontWeight: 600,
            fontFamily: 'monospace', letterSpacing: 0.5,
          }}>
            −{discount}%
          </span>
        )}
      </div>

      {/* Device selector card */}
      <div style={glass({ padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 12 })}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid rgba(255, 255, 255, 0.1)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(5px)',
            }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: G, fontFamily: 'monospace' }}>{devices}</span>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.4 }}>
                {deviceWord(devices).toUpperCase()}
              </p>
              <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 600, marginTop: 2 }}>
                {lang === 'ru' ? '// ОДНОВРЕМЕННЫХ' : '// SIMULTANEOUS'}
              </p>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div style={{ position: 'relative', padding: '4px 0' }}>
          <input
            type="range"
            min={0}
            max={DEVICES.length - 1}
            step={1}
            value={devIdx}
            onChange={e => setDevIdx(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#FFFFFF', cursor: 'pointer', height: 4 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {DEVICES.map((d, i) => (
              <span
                key={d}
                onClick={() => setDevIdx(i)}
                style={{
                  fontSize: 10, fontFamily: 'monospace', cursor: 'pointer',
                  color: i === devIdx ? TEXT : MUTED,
                  fontWeight: i === devIdx ? 800 : 500,
                  letterSpacing: 0.5,
                  transition: 'color 0.2s',
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div style={glass({ padding: '10px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'monospace' })}>
        {[
          { icon: Shield, text: 'NO LOGS' },
          { icon: Zap,    text: lang === 'ru' ? 'БЫСТРО' : 'FAST' },
          { icon: Star,   text: 'WireGuard' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon size={12} color={TEXT} />
            <span style={{ color: TEXT2, fontWeight: 600, letterSpacing: 0.5 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Plans grid 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {PLAN_DEFS.map((plan, i) => {
          const { total, perMonth } = calcPrice(plan.idx, devIdx)
          const selected = planIdx === i
          return (
            <button
              key={plan.labelRu}
              onClick={() => setPlanIdx(i)}
              style={{
                ...glass({
                  padding: '14px 12px',
                  border: selected
                    ? `1.5px solid rgba(255, 255, 255, 0.40)`
                    : `1px solid rgba(255, 255, 255, 0.08)`,
                  background: selected
                    ? 'rgba(255, 255, 255, 0.06)'
                    : 'rgba(26, 26, 26, 0.85)',
                }),
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: 96,
                display: 'flex', flexDirection: 'column', gap: 4,
              }}
            >
              {plan.popular && (
                <span style={{
                  position: 'absolute', top: 0, right: 10,
                  background: '#FFFFFF', color: '#0E0E0E',
                  fontSize: 8, fontWeight: 800, fontFamily: 'monospace',
                  padding: '2px 7px', borderRadius: '0 0 6px 6px', letterSpacing: 0.5,
                }}>
                  ★ {lang === 'ru' ? 'ХИТ' : 'BEST'}
                </span>
              )}
              <p style={{
                fontSize: 10, color: selected ? TEXT2 : MUTED,
                fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 700,
              }}>
                // {(lang === 'ru' ? plan.labelRu : plan.labelEn).toUpperCase()}
              </p>
              <p style={{
                fontSize: 22, fontWeight: 800, color: selected ? G : TEXT,
                lineHeight: 1, marginTop: 4,
                fontFamily: 'monospace', letterSpacing: -0.3,
                transition: 'color 0.2s',
              }}>
                {total} ₽
              </p>
              <p style={{ fontSize: 10, color: selected ? TEXT2 : MUTED, fontFamily: 'monospace', letterSpacing: 0.3 }}>
                {plan.months === 1
                  ? (lang === 'ru' ? 'в месяц' : 'per month')
                  : `${perMonth} ₽/${lang === 'ru' ? 'мес' : 'mo'}`}
              </p>
            </button>
          )
        })}
      </div>

      {/* CTA (в стиле ActiveHero.openInHapp — белая на чёрном) */}
      <button
        onClick={() => {
          activate(PLAN_KEYS[planIdx], DEVICES[devIdx], { countryCode: 'NL', name: 'Amsterdam', flag: '🇳🇱' })
          navigate('/')
        }}
        style={{
          width: '100%',
          background: '#FFFFFF',
          color: '#0E0E0E',
          borderRadius: 10, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: 'none', cursor: 'pointer',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: 10, color: 'rgba(14,14,14,0.55)', fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 700, marginBottom: 2 }}>
            {lang === 'ru' ? '// ОФОРМИТЬ' : '// CHECKOUT'}
          </p>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#0E0E0E', fontFamily: 'monospace', letterSpacing: -0.2 }}>
            {currentTotal} ₽
          </p>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(14,14,14,0.08)',
          border: '1px solid rgba(14,14,14,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronRight size={16} color="#0E0E0E" />
        </div>
      </button>

      {/* Footer hint */}
      <p style={{
        textAlign: 'center', fontSize: 10, color: AMBER,
        fontFamily: 'monospace', letterSpacing: 0.8, opacity: 0.5,
      }}>
        {lang === 'ru' ? 'СБП · БЕЗОПАСНО · БЕЗ АВТОПРОДЛЕНИЯ' : 'SBP · SECURE · NO AUTO-RENEW'}
      </p>

    </div>
  )
}
