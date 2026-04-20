import type { CSSProperties } from 'react'
import { useState, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Copy, Check, ExternalLink, Gift, Shield,
  Plus, Trash2, Laptop, Smartphone, Monitor, ShieldOff,
} from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { useSub } from '../context/SubContext'
import { RotatingGlobe } from '../components/RotatingGlobe'
import { UtopiaMark } from '../components/UtopiaMark'
import { getTelegramUser, getTelegramWebApp } from '../types/telegram'

// ── Palette ───────────────────────────────────────────────
const G      = '#FFFFFF'
const MUTED  = '#808080'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'
const ACCENT = '#FFFFFF'
const PANEL  = 'rgba(26, 26, 26, 0.50)'
const LINE   = 'rgba(255,255,255,0.10)'

// ── MOCK DATA ─────────────────────────────────────────────
const MOCK_KEY = 'vless://a3f2e1c5-9b47-4e2a-8d1f-7c6b9a0e4f3d@nl.utopiavpn.net:443?encryption=none&security=reality&type=tcp&sni=yahoo.com#Utopia-NL'
const MOCK_LOCATION = { flag: 'NL', name: 'Amsterdam' }

const DEVICES_STORAGE_KEY = 'utopia.devices'

interface Device {
  id: string
  name: string
  type: 'iphone' | 'android' | 'windows' | 'mac' | 'linux'
  connected: boolean
  lastSeen: string
  isCurrent: boolean
}

// ── Определение текущего устройства ──────────────────────
function getCurrentDevice(): { name: string; type: Device['type'] } {
  const tg = getTelegramWebApp()
  const platform = tg?.platform || 'unknown'
  const ua = navigator.userAgent.toLowerCase()

  if (platform === 'ios' || ua.includes('iphone') || ua.includes('ipad')) {
    return { name: 'iPhone', type: 'iphone' }
  }
  if (platform === 'android' || ua.includes('android')) {
    return { name: 'Android', type: 'android' }
  }
  if (ua.includes('mac os') || ua.includes('macintosh')) {
    return { name: 'Mac', type: 'mac' }
  }
  if (ua.includes('windows')) {
    return { name: 'Windows PC', type: 'windows' }
  }
  if (ua.includes('linux')) {
    return { name: 'Linux', type: 'linux' }
  }

  return { name: 'Устройство', type: 'windows' }
}

// ── Storage функции ───────────────────────────────────────
function getStoredDevices(): Device[] {
  try {
    const raw = localStorage.getItem(DEVICES_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function setStoredDevices(devices: Device[]) {
  try {
    localStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(devices))
  } catch {
    // storage full or unavailable
  }
}

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: PANEL,
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 18px 52px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)',
  borderRadius: 14,
  ...extra,
})

const BrandBanner = memo(function BrandBanner({ lang, userName, active }: {
  lang: 'ru' | 'en'
  userName: string
  active: boolean
}) {
  return (
    <section style={glass({
      padding: '16px',
      minHeight: 164,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025) 48%, rgba(0,0,0,0.18))',
    })}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 82% 38%, rgba(26,78,180,0.26), transparent 34%), radial-gradient(circle at 14% 0%, rgba(255,255,255,0.14), transparent 36%)',
          backgroundSize: '220% 220%',
          animation: 'banner-flow 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '52%',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/map-dark.svg"
          alt=""
          style={{
            position: 'absolute',
            width: 360,
            height: 360,
            right: -92,
            top: -96,
            objectFit: 'contain',
            opacity: 0.38,
            filter: 'contrast(1.12) brightness(1.18)',
            animation: 'map-float 9s ease-in-out infinite',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 68% 48%, rgba(255,255,255,0.16), transparent 36%), linear-gradient(90deg, rgba(14,14,14,0), rgba(14,14,14,0.12) 38%, rgba(14,14,14,0.48))',
          backgroundSize: '180% 180%',
          animation: 'banner-flow 10s ease-in-out infinite reverse',
        }} />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(13,13,13,0.98) 0%, rgba(13,13,13,0.76) 46%, rgba(13,13,13,0.16) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
          <div style={{
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <UtopiaMark size={50} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.3, fontWeight: 700, textTransform: 'uppercase' }}>
              {lang === 'ru' ? `Привет, ${userName}` : `Hi, ${userName}`}
            </p>
            <h1 style={{
              fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
              fontSize: 29,
              lineHeight: 1,
              fontWeight: 700,
              color: TEXT,
              letterSpacing: 0,
              marginTop: 3,
              textShadow: '0 0 20px rgba(255,255,255,0.16), 0 0 28px rgba(42,105,230,0.12)',
            }}>
              Utopia
            </h1>
            <p style={{ fontSize: 10, color: TEXT2, fontFamily: 'monospace', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', marginTop: 8 }}>
              {lang === 'ru' ? 'Тихий доступ' : 'Quiet access'}
            </p>
          </div>
        </div>
        <span style={{
          background: active ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
          border: active ? '1px solid rgba(255,255,255,0.20)' : `1px solid ${LINE}`,
          borderRadius: 20,
          padding: '4px 9px',
          color: active ? ACCENT : TEXT2,
          fontSize: 10,
          fontWeight: 800,
          fontFamily: 'monospace',
          letterSpacing: 0.5,
          flexShrink: 0,
        }}>
          {active ? 'ON' : 'OFF'}
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 300 }}>
        <p style={{
          fontSize: 16,
          lineHeight: 1.25,
          fontWeight: 750,
          letterSpacing: 0,
          background: 'linear-gradient(90deg, #FFFFFF 0%, #DDEBFF 40%, #3F7CFF 72%, #1D4ED8 100%)',
          backgroundSize: '220% 100%',
          animation: 'text-flow 7s ease-in-out infinite',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          {lang === 'ru' ? 'Твой тихий маршрут к свободному интернету' : 'Your quiet route to an open internet'}
        </p>
        <p style={{ fontSize: 11, lineHeight: 1.45, color: TEXT2, marginTop: 5 }}>
          {lang === 'ru' ? 'Быстрый VPN-ключ для всех устройств' : 'Fast VPN key for every device'}
        </p>
      </div>

    </section>
  )
})

// ── Device icon ────────────────────────────────────────────
function DeviceIcon({ type, connected }: { type: Device['type']; connected: boolean }) {
  const size = 14
  const color = connected ? G : MUTED
  switch (type) {
    case 'iphone': return <Smartphone size={size} color={color} />
    case 'android': return <Smartphone size={size} color={color} />
    case 'mac': return <Laptop size={size} color={color} />
    case 'windows': return <Monitor size={size} color={color} />
    case 'linux': return <Laptop size={size} color={color} />
    default: return <Monitor size={size} color={color} />
  }
}

// ── Device row ─────────────────────────────────────────────
const DeviceRow = memo(function DeviceRow({ device, onRemove, lang }: {
  device: Device; onRemove: (id: string) => void; lang: 'ru' | 'en'
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px',
      background: device.isCurrent
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(255,255,255,0.03)',
      border: device.isCurrent
        ? '1px solid rgba(255,255,255,0.22)'
        : '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      position: 'relative',
    }}>
      {device.isCurrent && (
        <span style={{
          position: 'absolute', top: -5, left: 10,
          background: ACCENT, color: '#0E0E0E',
          fontSize: 7, fontWeight: 800, fontFamily: 'monospace',
          padding: '1px 5px', borderRadius: 4,
          letterSpacing: 0.5,
        }}>{lang === 'ru' ? 'ЭТО ВЫ' : 'YOU'}</span>
      )}

      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: device.isCurrent ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${device.isCurrent ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <DeviceIcon type={device.type} connected={device.connected} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: device.isCurrent ? G : TEXT, fontFamily: 'monospace', marginBottom: 2 }}>
          {device.name}
        </p>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace' }}>
          {device.lastSeen}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontSize: 10, fontFamily: 'monospace',
          color: device.connected ? ACCENT : MUTED,
          fontWeight: device.connected ? 700 : 500,
        }}>
          {device.connected ? 'online' : 'offline'}
        </span>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: device.connected ? ACCENT : MUTED,
          boxShadow: 'none',
        }}/>
        {!device.isCurrent && (
          <button
            onClick={() => onRemove(device.id)}
            style={{
              background: 'none', border: 'none', padding: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={12} color={MUTED} />
          </button>
        )}
      </div>
    </div>
  )
})

// ── State: NO SUB ───────────────────────────────────────────
const InactiveHero = memo(function InactiveHero({ onBuy, onTrial, lang }: {
  onBuy: () => void; onTrial: () => void; lang: 'ru' | 'en'
}) {
  const benefits = lang === 'ru'
    ? [
        { icon: '1', t: '1 Гбит/с' },
        { icon: '5', t: '5 стран' },
        { icon: 'H', t: 'Happ' },
      ]
    : [
        { icon: '1', t: '1 Gbps' },
        { icon: '5', t: '5 countries' },
        { icon: 'H', t: 'Happ' },
      ]

  return (
    <div style={glass({
      padding: '20px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: PANEL,
      border: `1px solid ${LINE}`,
    })}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: '50%',
          background: '#2A2A2A',
          border: '1.5px solid rgba(255,255,255,0.14)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Shield size={22} color={ACCENT} />
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
        {benefits.map(({ icon, t }, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.045)', border: `1px solid ${LINE}`,
            borderRadius: 8, padding: '7px 8px',
          }}>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: 'monospace', fontWeight: 800 }}>{icon}</span>
            <span style={{ fontSize: 10, color: TEXT, fontFamily: 'monospace', fontWeight: 600 }}>{t}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          onClick={onBuy}
          style={{
            width: '100%',
            background: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.22)',
            color: '#0E0E0E',
            borderRadius: 8,
            padding: '13px 14px',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.2,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 12px 32px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.65)',
          }}
        >
          {lang === 'ru' ? 'Получить ключ' : 'Get key'}
          <span style={{ fontSize: 13 }}>→</span>
        </button>

        <button
          onClick={onTrial}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.018)',
            border: '1px solid rgba(255,255,255,0.16)',
            color: TEXT,
            borderRadius: 8,
            padding: '10px',
            fontSize: 11,
            fontWeight: 650,
            letterSpacing: 0.2,
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            position: 'relative',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <Gift size={13} />
          {lang === 'ru' ? 'Пробные 3 дня бесплатно' : 'Try 3 days free'}
        </button>
      </div>
    </div>
  )
})

// ── State: ACTIVE — key hero ───────────────────────────────
const ActiveHero = memo(function ActiveHero({ lang, expiresStr, daysLeft }: {
  lang: 'ru' | 'en'; expiresStr: string; daysLeft: number
}) {
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
    <div style={glass({
      padding: '14px 15px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      border: `1px solid ${LINE}`,
    })}>
      {/* top meta row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: ACCENT, boxShadow: 'none',
            animation: 'dot-pulse 2s ease-in-out infinite',
          }} />
          <span style={{ color: ACCENT, fontWeight: 700, letterSpacing: 0.8 }}>
            {lang === 'ru' ? 'АКТИВНА' : 'ACTIVE'}
          </span>
          <span style={{ color: MUTED, margin: '0 4px' }}>·</span>
          <span style={{ fontSize: 12 }}>{MOCK_LOCATION.flag}</span>
          <span style={{ color: TEXT, fontWeight: 600 }}>{MOCK_LOCATION.name}</span>
        </div>
        <div style={{ color: lowDays ? '#D0D0D0' : '#FFFFFF', fontWeight: 700, fontSize: 12 }}>
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
          background: 'rgba(0,0,0,0.46)',
          border: '1px solid rgba(255,255,255,0.10)',
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
            background: copied ? 'rgba(255,255,255,0.08)' : 'transparent',
            border: `1px solid ${copied ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)'}`,
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

  const currentDevice = getCurrentDevice()

  const [devices, setDevices] = useState<Device[]>(() => {
    const stored = getStoredDevices()
    const exists = stored.some(d => d.name === currentDevice.name && d.type === currentDevice.type)

    if (!exists) {
      const newDevice: Device = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: currentDevice.name,
        type: currentDevice.type,
        connected: true,
        lastSeen: 'Сейчас',
        isCurrent: true,
      }
      return [newDevice, ...stored]
    }

    return stored.map(d => ({
      ...d,
      isCurrent: d.name === currentDevice.name && d.type === currentDevice.type,
      lastSeen: d.name === currentDevice.name && d.type === currentDevice.type ? 'Сейчас' : d.lastSeen,
    }))
  })

  useEffect(() => {
    setStoredDevices(devices)
  }, [devices])

  const tgUser = getTelegramUser()
  const userName = tgUser?.first_name || 'Максим'

  const expiresStr = sub.expiresAt
    ? sub.expiresAt.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: '2-digit', month: '2-digit' })
    : '—'

  const connectedCount = devices.filter(d => d.connected).length
  const limit = sub.devices || 5

  function removeDevice(id: string) {
    setDevices(prev => prev.filter(d => d.id !== id))
  }

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      <BrandBanner
        lang={lang}
        userName={userName}
        active={sub.active}
      />

      {/* Rotating Globe Banner */}
      <div style={{ marginBottom: -150 }}>
        <RotatingGlobe />
      </div>

      {/* Hero — ключ или приглашение */}
      {sub.active
        ? <ActiveHero lang={lang} expiresStr={expiresStr} daysLeft={sub.daysLeft} />
        : (
          <InactiveHero
            lang={lang}
            onBuy={() => navigate('/sub')}
            onTrial={() => sub.activate('1m', 2, { countryCode: 'NL', name: 'Amsterdam', flag: 'NL' })}
          />
        )}

      {sub.active && (
        <button
          onClick={() => navigate('/compatibility')}
          style={{
            ...glass({
              padding: '13px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textAlign: 'left',
              cursor: 'pointer',
            }),
            background: 'rgba(255,255,255,0.035)',
          }}
        >
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ShieldOff size={16} color={ACCENT} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, color: TEXT, fontFamily: 'monospace', fontWeight: 800, letterSpacing: 0.2 }}>
              {lang === 'ru' ? 'COMPATIBILITY MODE' : 'COMPATIBILITY MODE'}
            </p>
            <p style={{ fontSize: 10, color: TEXT2, marginTop: 2, lineHeight: 1.35 }}>
              {lang === 'ru' ? 'Выбрать сайты и приложения для быстрой интеграции' : 'Select websites and apps for quick integration'}
            </p>
          </div>
          <span style={{ color: MUTED, fontSize: 14, fontFamily: 'monospace' }}>→</span>
        </button>
      )}

      {/* Devices panel — только когда активна */}
      {sub.active && (
        <>
          {/* Header + counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
              // {lang === 'ru' ? 'УСТРОЙСТВА' : 'DEVICES'}
            </p>
            <span style={{
              background: 'rgba(17,20,18,0.82)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 20, padding: '3px 10px',
              fontSize: 10, color: TEXT, fontFamily: 'monospace', fontWeight: 700,
            }}>
              {connectedCount}/{limit} {lang === 'ru' ? 'онлайн' : 'online'}
            </span>
          </div>

          <div style={glass({
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: 'rgba(26,26,26,0.50)',
          })}>
            {devices.length > 0 ? (
              devices.map(device => (
                <DeviceRow key={device.id} device={device} onRemove={removeDevice} lang={lang} />
              ))
            ) : (
              <p style={{ padding: '12px', textAlign: 'center', fontSize: 12, color: MUTED, fontFamily: 'monospace' }}>
                {lang === 'ru' ? 'Нет сохранённых устройств' : 'No saved devices'}
              </p>
            )}

            <button
              onClick={() => navigate('/install')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px',
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 8,
                color: TEXT, fontSize: 12, fontWeight: 600, fontFamily: 'monospace',
              }}
            >
              <Plus size={14} color={G} />
              {lang === 'ru' ? 'Подключить устройство' : 'Connect device'}
            </button>
          </div>
        </>
      )}

    </div>
  )
}
