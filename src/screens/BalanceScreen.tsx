import { Wallet, TrendingUp, Clock, ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import type { CSSProperties } from 'react'
import { SymbolReveal } from '../components/SymbolReveal'

// ── Palette (в стиле HomeScreen) ──────────────────────────
const G      = '#FFFFFF'
const MUTED  = '#808080'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'
const ACCENT = '#FFFFFF'
const GOLD   = '#D0D0D0'
const PANEL  = 'rgba(26, 26, 26, 0.50)'
const LINE   = 'rgba(255,255,255,0.10)'

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: PANEL,
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 18px 52px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)',
  borderRadius: 14,
  ...extra,
})

// ── MOCK данные ──────────────────────────────────────────
const MOCK_BALANCE = 0
const MOCK_TOPUPS = 0
const MOCK_SPENDS = 0
const MOCK_TOTAL = 0

// ── Main ──────────────────────────────────────────────────
export default function BalanceScreen() {
  const { lang } = useLang()

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, color: ACCENT, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 700 }}>
            <SymbolReveal text="// UTOPIA.BALANCE" />
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: -0.2, marginTop: 2 }}>
            {lang === 'ru' ? 'Баланс' : 'Balance'}
          </h1>
        </div>
      </div>

      {/* Main balance card */}
      <div style={glass({
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        background: PANEL,
        border: `1px solid ${LINE}`,
      })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Wallet size={20} color={ACCENT} />
          </div>
          <div>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 600 }}>
              {lang === 'ru' ? '// ДОСТУПНЫЙ БАЛАНС' : '// AVAILABLE BALANCE'}
            </p>
            <p style={{ fontSize: 32, fontWeight: 800, color: G, fontFamily: 'monospace', letterSpacing: -0.5, marginTop: 2 }}>
              {MOCK_BALANCE} <span style={{ fontSize: 18, color: ACCENT }}>₽</span>
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '12px',
            background: '#FFFFFF', color: '#0E0E0E',
            borderRadius: 10, border: 'none',
            fontSize: 12, fontWeight: 800, fontFamily: 'monospace', letterSpacing: 0.3,
          }}>
            + {lang === 'ru' ? 'Пополнить' : 'Top up'}
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10,
            color: GOLD, fontSize: 12, fontWeight: 700, fontFamily: 'monospace',
          }}>
            <ArrowUpRight size={14} color={GOLD} />
            {lang === 'ru' ? 'Вывести' : 'Withdraw'}
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={glass({ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'monospace' })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TrendingUp size={12} color={ACCENT} />
          <span style={{ color: MUTED }}>{lang === 'ru' ? 'Пополнений:' : 'Top ups:'}</span>
          <span style={{ color: ACCENT, fontWeight: 700 }}>{MOCK_TOPUPS}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={12} color={MUTED} />
          <span style={{ color: MUTED }}>{lang === 'ru' ? 'Трат:' : 'Spent:'}</span>
          <span style={{ color: TEXT, fontWeight: 700 }}>{MOCK_SPENDS}</span>
        </div>
        <div style={{ color: TEXT2 }}>
          {lang === 'ru' ? `Всего: ${MOCK_TOTAL} ₽` : `Total: ${MOCK_TOTAL} ₽`}
        </div>
      </div>

      {/* History header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
          // {lang === 'ru' ? 'ИСТОРИЯ ОПЕРАЦИЙ' : 'TRANSACTION HISTORY'}
        </p>
      </div>

      <div style={glass({
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        textAlign: 'center',
      })}>
        <Clock size={18} color={MUTED} />
        <p style={{ fontSize: 12, color: TEXT, fontFamily: 'monospace', fontWeight: 800 }}>
          {lang === 'ru' ? 'ОПЕРАЦИЙ НЕТ' : 'NO OPERATIONS'}
        </p>
        <p style={{ fontSize: 10.5, color: MUTED, lineHeight: 1.45 }}>
          {lang === 'ru' ? 'История появится после первого пополнения или оплаты.' : 'History will appear after the first top-up or payment.'}
        </p>
      </div>

    </div>
  )
}
