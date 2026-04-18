import type { CSSProperties } from 'react'
import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap, Globe, Smartphone, Copy, Check, ExternalLink,
  Gift, Users, Shield, Download, Settings2, MapPin,
} from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { useSub } from '../context/SubContext'
import { RotatingGlobe } from '../components/RotatingGlobe'

// ── Palette ───────────────────────────────────────────────
const G      = '#FFFFFF'
const MUTED  = '#808080'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'
const AMBER  = '#D0D0D0'

// ── MOCK DATA (TODO: заменить на API из 3x-ui/Marzban) ────
const MOCK_KEY = 'vless://a3f2e1c5-9b47-4e2a-8d1f-7c6b9a0e4f3d@nl.utopia-vpn.net:443?encryption=none&security=reality&type=tcp&sni=yahoo.com#Utopia-NL'
const MOCK_LOCATION = { flag: '🇳🇱', name: 'Amsterdam' }
const MOCK_TRAFFIC = { down: 12.4, up: 1.8 }
const MOCK_DEVICES = { used: 2, limit: 5 }

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: 'rgba(26, 26, 26, 0.85)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  borderRadius: 12,
  ...extra,
})

const tileStyle: CSSProperties = {
  ...glass({ padding: '14px 12px' }),
  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
  textAlign: 'left', minHeight: 92, cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  position: 'relative',
  overflow: 'hidden',
}

const Tile = memo(function Tile({ icon: Icon, title, subtitle, onClick }: {
  icon: typeof Zap; title: string; subtitle: string; onClick: () => void; accent?: string
}) {
  return (
    <button onClick={onClick} style={tileStyle}>
      {/* Gradient overlay on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} className="tile-glow" />

      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(5px)',
        position: 'relative',
        zIndex: 1,
      }}>
        <Icon size={15} color="#FFFFFF" />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.3, lineHeight: 1.2 }}>
          {title}
        </p>
        <p style={{ fontSize: 9.5, color: TEXT2, marginTop: 2, lineHeight: 1.3 }}>
          {subtitle}
        </p>
      </div>
    </button>
  )
})

// ── State: NO SUB — hero CTA ──────────────────────────────
const InactiveHero = memo(function InactiveHero({ onBuy, onTrial, lang }: { onBuy: () => void; onTrial: () => void; lang: 'ru' | 'en' }) {
  const benefits = lang === 'ru'
    ? [{ icon: Zap, t: '1 Гбит/с' }, { icon: Globe, t: '5 стран' }, { icon: Smartphone, t: 'Happ' }]
    : [{ icon: Zap, t: '1 Gbps' },   { icon: Globe, t: '5 countries' }, { icon: Smartphone, t: 'Happ' }]

  return (
    <div style={glass({ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 14 })}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: '50%',
          background: '#2A2A2A',
          border: '1.5px solid #3A3A3A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Shield size={22} color="#FFFFFF" />
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.4 }}>
            {lang === 'ru' ? 'ПОДПИСКА НЕ АКТИВНА' : 'NO SUBSCRIPTION'}
          </p>
          <p style={{ fontSize: 11, color: TEXT2, marginTop: 2, lineHeight: 1.4 }}>
            {lang === 'ru' ? 'Оформи, чтобы получить ключ' : 'Get one to receive a key'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {benefits.map(({ icon: Icon, t }, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 6,
            background: '#2A2A2A', border: '1px solid #3A3A3A',
            borderRadius: 8, padding: '7px 8px',
          }}>
            <Icon size={12} color="#FFFFFF" />
            <span style={{ fontSize: 10, color: TEXT, fontFamily: 'monospace', fontWeight: 600 }}>{t}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onBuy}
        style={{
          width: '100%',
          background: '#FFFFFF',
          color: '#0E0E0E',
          borderRadius: 10, padding: '13px',
          fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
          fontFamily: 'monospace', textTransform: 'uppercase',
          border: 'none',
        }}
      >
        {lang === 'ru' ? 'ПОЛУЧИТЬ КЛЮЧ →' : 'GET KEY →'}
      </button>

      <button
        onClick={onTrial}
        style={{
          width: '100%',
          background: 'transparent',
          border: '1px solid #2A2A2A',
          color: '#FFFFFF',
          borderRadius: 10, padding: '10px',
          fontSize: 12, fontWeight: 600, letterSpacing: 0.3,
          fontFamily: 'monospace',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        <Gift size={13} />
        {lang === 'ru' ? 'ПРОБНЫЕ 3 ДНЯ БЕСПЛАТНО' : 'TRY 3 DAYS FREE'}
      </button>
    </div>
  )
})

// ── State: ACTIVE — key hero ──────────────────────────────
const ActiveHero = memo(function ActiveHero({ lang, expiresStr, daysLeft }: { lang: 'ru' | 'en'; expiresStr: string; daysLeft: number }) {
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
    <div style={glass({ padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 12 })}>
      {/* top meta row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: G, boxShadow: `0 0 8px ${G}`,
            animation: 'dot-pulse 2s ease-in-out infinite',
          }} />
          <span style={{ color: G, fontWeight: 700, letterSpacing: 0.8 }}>
            {lang === 'ru' ? 'АКТИВНА' : 'ACTIVE'}
          </span>
          <span style={{ color: MUTED, margin: '0 4px' }}>·</span>
          <span style={{ fontSize: 12 }}>{MOCK_LOCATION.flag}</span>
          <span style={{ color: TEXT, fontWeight: 600 }}>{MOCK_LOCATION.name}</span>
        </div>
        <div style={{
          color: lowDays ? AMBER : '#FFFFFF',
          fontWeight: 700, fontSize: 12,
        }}>
          {daysLeft}<span style={{ color: TEXT2, fontWeight: 500, marginLeft: 3 }}>{lang === 'ru' ? 'дн' : 'd'}</span>
          <span style={{ color: MUTED, margin: '0 5px' }}>·</span>
          <span style={{ color: TEXT2, fontWeight: 500 }}>{expiresStr}</span>
        </div>
      </div>

      {/* key block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 700 }}>
            {lang === 'ru' ? '// VLESS-КЛЮЧ' : '// VLESS KEY'}
          </p>
          <button
            onClick={() => setRevealed(v => !v)}
            style={{ background: 'none', color: MUTED, fontSize: 10, fontFamily: 'monospace', letterSpacing: 0.5 }}
          >
            {revealed ? (lang === 'ru' ? 'СКРЫТЬ' : 'HIDE') : (lang === 'ru' ? 'ПОКАЗАТЬ' : 'REVEAL')}
          </button>
        </div>

        <div style={{
          background: '#000000',
          border: '1px solid #2A2A2A',
          borderRadius: 8, padding: '9px 11px',
          fontSize: 10.5, color: '#808080',
          fontFamily: 'monospace', wordBreak: 'break-all',
          lineHeight: 1.5, letterSpacing: 0.2,
          maxHeight: 66, overflow: 'hidden',
        }}>
          {masked}
        </div>
      </div>

      {/* actions row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
        <button
          onClick={openInHapp}
          style={{
            background: '#FFFFFF',
            color: '#0E0E0E',
            borderRadius: 10, padding: '12px',
            fontSize: 12, fontWeight: 700, letterSpacing: 0.3,
            fontFamily: 'monospace', textTransform: 'uppercase',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          }}
        >
          <ExternalLink size={14} />
          {lang === 'ru' ? 'ОТКРЫТЬ В HAPP' : 'OPEN IN HAPP'}
        </button>
        <button
          onClick={copyKey}
          aria-label={lang === 'ru' ? 'Копировать ключ' : 'Copy key'}
          style={{
            background: copied ? '#2A2A2A' : 'transparent',
            border: `1px solid ${copied ? '#3A3A3A' : '#2A2A2A'}`,
            color: '#FFFFFF',
            borderRadius: 10, padding: '0 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  )
})

// ── Main ──────────────────────────────────────────────────
export default function HomeScreen() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const sub = useSub()

  const tgUser = (window as { Telegram?: { WebApp?: { initDataUnsafe?: { user?: { first_name?: string } } } } }).Telegram?.WebApp?.initDataUnsafe?.user
  const userName = tgUser?.first_name || 'Максим'

  const expiresStr = sub.expiresAt
    ? sub.expiresAt.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: '2-digit', month: '2-digit' })
    : '—'

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Compact header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
            // UTOPIA.VPN
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT, letterSpacing: -0.2, marginTop: 2 }}>
            {lang === 'ru' ? `Привет, ${userName}` : `Hi, ${userName}`}
          </h1>
        </div>
        <span style={{
          background: sub.active ? '#2A2A2A' : '#2A2A2A',
          border: `1px solid #3A3A3A`,
          borderRadius: 20, padding: '4px 10px',
          fontSize: 10, color: sub.active ? '#FFFFFF' : '#B0B0B0', fontWeight: 600,
          fontFamily: 'monospace', letterSpacing: 0.5,
        }}>
          {sub.active ? (lang === 'ru' ? '● ON' : '● ON') : (lang === 'ru' ? '○ OFF' : '○ OFF')}
        </span>
      </div>

      {/* Rotating Globe Banner */}
      <div style={{ marginBottom: -150 }}>
        <RotatingGlobe />
      </div>

      {/* Hero */}
      {sub.active
        ? <ActiveHero lang={lang} expiresStr={expiresStr} daysLeft={sub.daysLeft} />
        : <InactiveHero lang={lang} onBuy={() => navigate('/sub')} onTrial={() => sub.activate('1m', 2, { countryCode: 'NL', name: 'Amsterdam', flag: '🇳🇱' })} />
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

      {/* Compact stats strip — only if active */}
      {sub.active && (
        <div style={glass({ padding: '10px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'monospace' })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: MUTED }}>↓</span>
            <span style={{ color: G, fontWeight: 800 }}>{MOCK_TRAFFIC.down}</span>
            <span style={{ color: TEXT2 }}>ГБ</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: MUTED }}>↑</span>
            <span style={{ color: G, fontWeight: 800 }}>{MOCK_TRAFFIC.up}</span>
            <span style={{ color: TEXT2 }}>ГБ</span>
          </div>
          <div style={{ color: TEXT2 }}>
            <span style={{ color: MUTED }}>{lang === 'ru' ? 'устр:' : 'dev:'}</span>{' '}
            <span style={{ color: TEXT, fontWeight: 700 }}>{MOCK_DEVICES.used}/{MOCK_DEVICES.limit}</span>
          </div>
        </div>
      )}

    </div>
  )
}
