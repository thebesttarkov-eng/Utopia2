import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap, Globe, Smartphone, Copy, Check, ExternalLink,
  Gift, Users, Shield, Download, Settings2, MapPin, Sparkles,
} from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { useSub } from '../context/SubContext'

// ── Palette ───────────────────────────────────────────────
const G      = '#FFFFFF'
const MUTED  = '#808080'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'
const AMBER  = '#D0D0D0'
const ACCENT = '#6366F1'
const ACCENT_LIGHT = '#818CF8'

// ── MOCK DATA (TODO: заменить на API из 3x-ui/Marzban) ────
const MOCK_KEY = 'vless://a3f2e1c5-9b47-4e2a-8d1f-7c6b9a0e4f3d@nl.utopia-vpn.net:443?encryption=none&security=reality&type=tcp&sni=yahoo.com#Utopia-NL'
const MOCK_LOCATION = { flag: '🇳🇱', name: 'Amsterdam' }
const MOCK_TRAFFIC = { down: 12.4, up: 1.8 }
const MOCK_DEVICES = { used: 2, limit: 5 }

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(20,20,20,0.98) 100%)',
  backdropFilter: 'blur(20px)',
  border: `1px solid rgba(255,255,255,0.08)`,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
  borderRadius: 16,
  ...extra,
})

const tileStyle: CSSProperties = {
  ...glass({ padding: '16px 14px' }),
  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
  textAlign: 'left', minHeight: 100, cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
}

function Tile({ icon: Icon, title, subtitle, onClick, accent }: {
  icon: typeof Zap; title: string; subtitle: string; onClick: () => void; accent?: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      style={{
        ...tileStyle,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 12px 40px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(129,140,248,0.05) 100%)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: isHovered
          ? 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)'
          : 'linear-gradient(135deg, #2A2A2A 0%, #1F1F1F 100%)',
        border: `1px solid ${isHovered ? 'rgba(99,102,241,0.5)' : '#3A3A3A'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(99,102,241,0.4)' : 'none',
        position: 'relative',
        zIndex: 1,
      }}>
        <Icon size={16} color="#FFFFFF" />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: 12,
          fontWeight: 700,
          color: TEXT,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: 0.3,
          lineHeight: 1.3,
          marginBottom: 2,
        }}>
          {title}
        </p>
        <p style={{ fontSize: 10, color: TEXT2, lineHeight: 1.4 }}>
          {subtitle}
        </p>
      </div>
    </button>
  )
}

// ── State: NO SUB — hero CTA ──────────────────────────────
function InactiveHero({ onBuy, onTrial, lang }: { onBuy: () => void; onTrial: () => void; lang: 'ru' | 'en' }) {
  const benefits = lang === 'ru'
    ? [{ icon: Zap, t: '1 Гбит/с' }, { icon: Globe, t: '5 стран' }, { icon: Smartphone, t: 'Happ' }]
    : [{ icon: Zap, t: '1 Gbps' },   { icon: Globe, t: '5 countries' }, { icon: Smartphone, t: 'Happ' }]

  return (
    <div style={{
      ...glass({ padding: '24px 20px' }),
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated gradient background */}
      <div style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 200,
        height: 200,
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
          border: '2px solid rgba(99,102,241,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 8px 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}>
          <Shield size={26} color="#FFFFFF" />
        </div>
        <div>
          <p style={{
            fontSize: 14,
            fontWeight: 800,
            color: TEXT,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: 0.5,
            marginBottom: 4,
          }}>
            {lang === 'ru' ? 'ПОДПИСКА НЕ АКТИВНА' : 'NO SUBSCRIPTION'}
          </p>
          <p style={{ fontSize: 12, color: TEXT2, lineHeight: 1.5 }}>
            {lang === 'ru' ? 'Оформи, чтобы получить ключ' : 'Get one to receive a key'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}>
        {benefits.map(({ icon: Icon, t }, i) => (
          <div key={i} style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: 'linear-gradient(135deg, rgba(42,42,42,0.8) 0%, rgba(31,31,31,0.9) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            padding: '10px 10px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            <Icon size={14} color="#818CF8" />
            <span style={{
              fontSize: 11,
              color: TEXT,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 600,
            }}>{t}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onBuy}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
          color: '#FFFFFF',
          borderRadius: 12,
          padding: '16px',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 0.5,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textTransform: 'uppercase',
          border: 'none',
          boxShadow: '0 8px 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
      >
        <Sparkles size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
        {lang === 'ru' ? 'ПОЛУЧИТЬ КЛЮЧ' : 'GET KEY'}
      </button>

      <button
        onClick={onTrial}
        style={{
          width: '100%',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.3)',
          color: '#818CF8',
          borderRadius: 12,
          padding: '14px',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.3,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(99,102,241,0.15)'
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
        }}
      >
        <Gift size={15} />
        {lang === 'ru' ? 'ПРОБНЫЕ 3 ДНЯ БЕСПЛАТНО' : 'TRY 3 DAYS FREE'}
      </button>
    </div>
  )
}

// ── State: ACTIVE — key hero ──────────────────────────────
function ActiveHero({ lang, expiresStr, daysLeft }: { lang: 'ru' | 'en'; expiresStr: string; daysLeft: number }) {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(MOCK_KEY)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* ignore */ }
  }

  function openInHapp() {
    const encoded = btoa(unescape(encodeURIComponent(MOCK_KEY)))
    window.location.href = `happ://add/${encoded}`
  }

  const masked = revealed ? MOCK_KEY : MOCK_KEY.slice(0, 20) + '••••••••••••••' + MOCK_KEY.slice(-10)
  const lowDays = daysLeft <= 7

  return (
    <div style={{
      ...glass({ padding: '18px 18px 20px' }),
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Success gradient background */}
      <div style={{
        position: 'absolute',
        top: -80,
        left: -80,
        width: 160,
        height: 160,
        background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      {/* top meta row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 11,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 12px rgba(34,197,94,0.6)',
            animation: 'dot-pulse 2s ease-in-out infinite',
          }} />
          <span style={{
            color: '#22C55E',
            fontWeight: 700,
            letterSpacing: 0.8,
            fontSize: 12,
          }}>
            {lang === 'ru' ? 'АКТИВНА' : 'ACTIVE'}
          </span>
          <span style={{ color: MUTED, margin: '0 5px' }}>·</span>
          <span style={{ fontSize: 13 }}>{MOCK_LOCATION.flag}</span>
          <span style={{ color: TEXT, fontWeight: 600, fontSize: 12 }}>{MOCK_LOCATION.name}</span>
        </div>
        <div style={{
          background: lowDays ? 'rgba(251,191,36,0.15)' : 'rgba(99,102,241,0.15)',
          border: `1px solid ${lowDays ? 'rgba(251,191,36,0.3)' : 'rgba(99,102,241,0.3)'}`,
          borderRadius: 8,
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <span style={{
            color: lowDays ? '#FCD34D' : '#818CF8',
            fontWeight: 700,
            fontSize: 13,
          }}>
            {daysLeft}
          </span>
          <span style={{ color: TEXT2, fontWeight: 500, fontSize: 10 }}>
            {lang === 'ru' ? 'дн' : 'd'}
          </span>
        </div>
      </div>

      {/* key block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{
            fontSize: 10,
            color: '#818CF8',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: 1,
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            {lang === 'ru' ? 'VLESS Ключ' : 'VLESS Key'}
          </p>
          <button
            onClick={() => setRevealed(v => !v)}
            style={{
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#818CF8',
              fontSize: 10,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: 0.5,
              padding: '4px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {revealed ? (lang === 'ru' ? 'СКРЫТЬ' : 'HIDE') : (lang === 'ru' ? 'ПОКАЗАТЬ' : 'REVEAL')}
          </button>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '12px 14px',
          fontSize: 11,
          color: '#9CA3AF',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
          lineHeight: 1.6,
          letterSpacing: 0.3,
          maxHeight: 70,
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
        }}>
          {masked}
        </div>
      </div>

      {/* actions row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, position: 'relative', zIndex: 1 }}>
        <button
          onClick={openInHapp}
          style={{
            background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
            color: '#FFFFFF',
            borderRadius: 10,
            padding: '14px 16px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.3,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textTransform: 'uppercase',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)'
          }}
        >
          <ExternalLink size={15} />
          {lang === 'ru' ? 'ОТКРЫТЬ' : 'OPEN'}
        </button>
        <button
          onClick={copyKey}
          aria-label={lang === 'ru' ? 'Копировать ключ' : 'Copy key'}
          style={{
            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(99,102,241,0.1)',
            border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.3)'}`,
            color: copied ? '#22C55E' : '#818CF8',
            borderRadius: 10,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────
export default function HomeScreen() {
  const { tr: _tr, lang } = useLang()
  const navigate = useNavigate()
  const sub = useSub()

  const tgUser = (window as { Telegram?: { WebApp?: { initDataUnsafe?: { user?: { first_name?: string } } } } }).Telegram?.WebApp?.initDataUnsafe?.user
  const userName = tgUser?.first_name || 'Максим'

  const expiresStr = sub.expiresAt
    ? sub.expiresAt.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: '2-digit', month: '2-digit' })
    : '—'

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Modern header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
        <div>
          <p style={{
            fontSize: 10,
            color: '#818CF8',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: 1.8,
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            UTOPIA.VPN
          </p>
          <h1 style={{
            fontSize: 24,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #B0B0B0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: -0.5,
            marginTop: 4,
          }}>
            {lang === 'ru' ? `Привет, ${userName}` : `Hi, ${userName}`}
          </h1>
        </div>
        <span style={{
          background: sub.active
            ? 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.1) 100%)'
            : 'rgba(99,102,241,0.1)',
          border: `1px solid ${sub.active ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.3)'}`,
          borderRadius: 20,
          padding: '6px 12px',
          fontSize: 11,
          color: sub.active ? '#22C55E' : '#818CF8',
          fontWeight: 700,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: 0.5,
          boxShadow: sub.active ? '0 0 12px rgba(34,197,94,0.2)' : 'none',
        }}>
          {sub.active ? (lang === 'ru' ? '● ON' : '● ON') : (lang === 'ru' ? '○ OFF' : '○ OFF')}
        </span>
      </div>

      {/* Hero */}
      {sub.active
        ? <ActiveHero lang={lang} expiresStr={expiresStr} daysLeft={sub.daysLeft} />
        : <InactiveHero lang={lang} onBuy={() => navigate('/sub')} onTrial={() => sub.activate('1m', 2)} />
      }

      {/* 2×2 quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Tile
          icon={Download}
          title={lang === 'ru' ? 'УСТАНОВИТЬ' : 'INSTALL'}
          subtitle={lang === 'ru' ? 'Happ, Win, Mac, iOS' : 'Happ, Win, Mac, iOS'}
          onClick={() => navigate('/install')}
        />
        <Tile
          icon={Settings2}
          title={sub.active ? (lang === 'ru' ? 'ПРОДЛИТЬ' : 'RENEW') : (lang === 'ru' ? 'ПОДПИСКА' : 'PLAN')}
          subtitle={lang === 'ru' ? 'Тарифы и оплата' : 'Plans & billing'}
          onClick={() => navigate('/sub')}
        />
        <Tile
          icon={MapPin}
          title={lang === 'ru' ? 'ЛОКАЦИИ' : 'LOCATIONS'}
          subtitle={lang === 'ru' ? '5 стран · NL · DE…' : '5 countries · NL · DE…'}
          onClick={() => navigate('/sub')}
          accent={AMBER}
        />
        <Tile
          icon={Users}
          title={lang === 'ru' ? 'ДРУЗЬЯ' : 'FRIENDS'}
          subtitle={lang === 'ru' ? '+30 дн за друга' : '+30d per friend'}
          onClick={() => { /* TODO: /referrals */ }}
          accent={AMBER}
        />
      </div>

      {/* Modern stats strip — only if active */}
      {sub.active && (
        <div style={{
          ...glass({ padding: '14px 16px' }),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{
              fontSize: 9,
              color: '#818CF8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: 1,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              {lang === 'ru' ? 'Загрузка' : 'Download'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 16,
                color: TEXT,
                fontWeight: 800,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {MOCK_TRAFFIC.down}
              </span>
              <span style={{ fontSize: 10, color: TEXT2, fontWeight: 600 }}>ГБ</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{
              fontSize: 9,
              color: '#818CF8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: 1,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              {lang === 'ru' ? 'Отдача' : 'Upload'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 16,
                color: TEXT,
                fontWeight: 800,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {MOCK_TRAFFIC.up}
              </span>
              <span style={{ fontSize: 10, color: TEXT2, fontWeight: 600 }}>ГБ</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{
              fontSize: 9,
              color: '#818CF8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: 1,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              {lang === 'ru' ? 'Устройства' : 'Devices'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 16,
                color: TEXT,
                fontWeight: 800,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {MOCK_DEVICES.used}
              </span>
              <span style={{ fontSize: 12, color: TEXT2, fontWeight: 600 }}>/{MOCK_DEVICES.limit}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
