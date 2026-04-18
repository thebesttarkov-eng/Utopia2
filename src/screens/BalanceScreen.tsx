import { memo } from 'react'
import { Wallet, TrendingUp, TrendingDown, Clock, ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import type { CSSProperties } from 'react'

// ── Palette (в стиле HomeScreen) ──────────────────────────
const G      = '#FFFFFF'
const MUTED  = '#808080'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: 'rgba(26, 26, 26, 0.85)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  borderRadius: 12,
  ...extra,
})

// ── MOCK данные ──────────────────────────────────────────
const MOCK_BALANCE = 847.50
const MOCK_HISTORY = [
  { id: 1, type: 'topup',   amount: 500,   date: '18.04.2026', desc: 'Пополнение через СБП' },
  { id: 2, type: 'sub',     amount: -199,  date: '15.04.2026', desc: 'Подписка 1 мес' },
  { id: 3, type: 'referral', amount: 30,   date: '10.04.2026', desc: 'Реферал +30 дн' },
  { id: 4, type: 'topup',   amount: 200,   date: '01.04.2026', desc: 'Пополнение через СБП' },
  { id: 5, type: 'sub',     amount: -499,  date: '01.03.2026', desc: 'Подписка 3 мес' },
]

// ── Transaction row ───────────────────────────────────────
const TxRow = memo(function TxRow({ amount, date, desc }: {
  amount: number; date: string; desc: string
}) {
  const isPositive = amount > 0
  return (
    <div style={{
      ...glass({ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }),
      minHeight: 68,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: isPositive ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {isPositive
          ? <TrendingUp size={16} color={G} />
          : <TrendingDown size={16} color={MUTED} />
        }
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: TEXT, fontFamily: 'monospace', marginBottom: 2 }}>
          {desc}
        </p>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace' }}>
          {date}
        </p>
      </div>
      <span style={{
        fontSize: 14, fontWeight: 800, fontFamily: 'monospace',
        color: isPositive ? G : TEXT,
        letterSpacing: -0.3,
      }}>
        {isPositive ? '+' : ''}{amount} ₽
      </span>
    </div>
  )
})

// ── Main ──────────────────────────────────────────────────
export default function BalanceScreen() {
  const { lang } = useLang()

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
            // UTOPIA.BALANCE
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT, letterSpacing: -0.2, marginTop: 2 }}>
            {lang === 'ru' ? 'Баланс' : 'Balance'}
          </h1>
        </div>
      </div>

      {/* Main balance card */}
      <div style={glass({ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Wallet size={20} color={G} />
          </div>
          <div>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 600 }}>
              {lang === 'ru' ? '// ДОСТУПНЫЙ БАЛАНС' : '// AVAILABLE BALANCE'}
            </p>
            <p style={{ fontSize: 32, fontWeight: 800, color: G, fontFamily: 'monospace', letterSpacing: -0.5, marginTop: 2 }}>
              {MOCK_BALANCE} <span style={{ fontSize: 18, color: TEXT2 }}>₽</span>
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
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: TEXT, fontSize: 12, fontWeight: 700, fontFamily: 'monospace',
          }}>
            <ArrowUpRight size={14} />
            {lang === 'ru' ? 'Вывести' : 'Withdraw'}
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={glass({ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'monospace' })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TrendingUp size={12} color={G} />
          <span style={{ color: MUTED }}>{lang === 'ru' ? 'Пополнений:' : 'Top ups:'}</span>
          <span style={{ color: TEXT, fontWeight: 700 }}>2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={12} color={MUTED} />
          <span style={{ color: MUTED }}>{lang === 'ru' ? 'Трат:' : 'Spent:'}</span>
          <span style={{ color: TEXT, fontWeight: 700 }}>5</span>
        </div>
        <div style={{ color: TEXT2 }}>
          {lang === 'ru' ? 'Всего: 1247 ₽' : 'Total: 1247 ₽'}
        </div>
      </div>

      {/* History header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
          // {lang === 'ru' ? 'ИСТОРИЯ ОПЕРАЦИЙ' : 'TRANSACTION HISTORY'}
        </p>
      </div>

      {/* Transactions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MOCK_HISTORY.map(tx => (
          <TxRow key={tx.id} {...tx} />
        ))}
      </div>

    </div>
  )
}