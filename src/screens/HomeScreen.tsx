import type { CSSProperties } from 'react'
import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Copy, Check, ExternalLink, Gift, Shield, Download, Settings2,
  Plus, Trash2, Laptop, Smartphone, Monitor,
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

// ── MOCK DATA ─────────────────────────────────────────────
const MOCK_KEY = 'vless://a3f2e1c5-9b47-4e2a-8d1f-7c6b9a0e4f3d@nl.utopia-vpn.net:443?encryption=none&security=reality&type=tcp&sni=yahoo.com#Utopia-NL'
const MOCK_LOCATION = { flag: '🇳🇱', name: 'Amsterdam' }
const MOCK_TRAFFIC = { down: 12.4, up: 1.8 }

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
  const tg = (window as any).Telegram?.WebApp
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
  background: 'rgba(26, 26, 26, 0.85)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  borderRadius: 12,
  ...extra,
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
        ? '1px solid rgba(255,255,255,0.2)'
        : '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      position: 'relative',
    }}>
      {device.isCurrent && (
        <span style={{
          position: 'absolute', top: -5, left: 10,
          background: G, color: '#0E0E0E',
          fontSize: 7, fontWeight: 800, fontFamily: 'monospace',
          padding: '1px 5px', borderRadius: 4,
          letterSpacing: 0.5,
        }}>ЭТО ВЫ</span>
      )}

      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: device.isCurrent ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${device.isCurrent ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
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
          color: device.connected ? G : MUTED,
          fontWeight: device.connected ? 700 : 500,
        }}>
          {device.connected ? (lang === 'ru' ? 'online' : 'online') : (lang === 'ru' ? 'offline' : 'offline')}
        </span>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: device.connected ? G : MUTED,
          boxShadow: device.connected ? '0 0 6px rgba(255,255,255,0.6)' : 'none',
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
        { icon: '⚡', t: '1 Гбит/с' },
        { icon: '🌍', t: '5 стран' },
        { icon: '📱', t: 'Happ' },
      ]
    : [
        { icon: '⚡', t: '1 Gbps' },
        { icon: '🌍', t: '5 countries' },
        { icon: '📱', t: 'Happ' },
      ]

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
        {benefits.map(({ icon, t }, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 6,
            background: '#2A2A2A', border: '1px solid #3A3A3A',
            borderRadius: 8, padding: '7px 8px',
          }}>
            <span style={{ fontSize: 12 }}>{icon}</span>
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
        <div style={{ color: lowDays ? AMBER : '#FFFFFF', fontWeight: 700, fontSize: 12 }}>
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

  const currentDevice = getCurrentDevice()

  // Загружаем устройства и добавляем текущее если нужно
  const [devices, setDevices] = useState<Device[]>(() => {
    const stored = getStoredDevices()
    const exists = stored.some(d => d.name === currentDevice.name && d.type === currentDevice.type)

    if (!exists) {
      const newDevice: Device = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: currentDevice.name,
        type: currentDevice.type,
        connected: true,
        lastSeen: 'Сейчас',
        isCurrent: true,
      }
      const updated = [newDevice, ...stored]
      setStoredDevices(updated)
      return updated
    }

    // Обновляем текущее устройство в списке
    const updated = stored.map(d => ({
      ...d,
      isCurrent: d.name === currentDevice.name && d.type === currentDevice.type,
      lastSeen: d.name === currentDevice.name && d.type === currentDevice.type ? 'Сейчас' : d.lastSeen,
    }))
    return updated
  })

  const tgUser = (window as any).Telegram?.WebApp?.initDataUnsafe?.user
  const userName = tgUser?.first_name || 'Максим'

  const expiresStr = sub.expiresAt
    ? sub.expiresAt.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: '2-digit', month: '2-digit' })
    : '—'

  const connectedCount = devices.filter(d => d.connected).length
  const limit = sub.devices || 5

  function removeDevice(id: string) {
    const updated = devices.filter(d => d.id !== id)
    setDevices(updated)
    setStoredDevices(updated)
  }

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
          background: '#2A2A2A',
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

      {/* Hero — ключ или приглашение */}
      {sub.active
        ? <ActiveHero lang={lang} expiresStr={expiresStr} daysLeft={sub.daysLeft} />
        : <InactiveHero lang={lang} onBuy={() => navigate('/sub')} onTrial={() => sub.activate('1m', 2, { countryCode: 'NL', name: 'Amsterdam', flag: '🇳🇱' })} />
      }

      {/* Devices panel — только когда активна */}
      {sub.active && (
        <>
          {/* Header + counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
              // {lang === 'ru' ? 'УСТРОЙСТВА' : 'DEVICES'}
            </p>
            <span style={{
              background: 'rgba(26,26,26,0.85)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '3px 10px',
              fontSize: 10, color: TEXT, fontFamily: 'monospace', fontWeight: 600,
            }}>
              {connectedCount}/{limit} {lang === 'ru' ? 'онлайн' : 'online'}
            </span>
          </div>

          {/* Device list */}
          {devices.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {devices.map(device => (
                <DeviceRow key={device.id} device={device} onRemove={removeDevice} lang={lang} />
              ))}
            </div>
          ) : (
            <div style={glass({ padding: '20px', textAlign: 'center' })}>
              <p style={{ fontSize: 12, color: MUTED, fontFamily: 'monospace' }}>
                {lang === 'ru' ? 'Нет сохранённых устройств' : 'No saved devices'}
              </p>
            </div>
          )}

          {/* Add device button */}
          <button
            onClick={() => navigate('/install')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: TEXT, fontSize: 12, fontWeight: 600, fontFamily: 'monospace',
            }}
          >
            <Plus size={14} color={G} />
            {lang === 'ru' ? 'Подключить устройство' : 'Connect device'}
          </button>
        </>
      )}

      {/* Quick actions — только когда НЕ активна */}
      {!sub.active && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={() => navigate('/install')}
            style={{
              ...glass({ padding: '14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, minHeight: 92, cursor: 'pointer', position: 'relative', overflow: 'hidden' }),
              background: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Download size={15} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.3, lineHeight: 1.2 }}>
                {lang === 'ru' ? 'УСТАНОВИТЬ' : 'INSTALL'}
              </p>
              <p style={{ fontSize: 9.5, color: TEXT2, marginTop: 2, lineHeight: 1.3 }}>
                {lang === 'ru' ? 'Happ, Win, Mac, iOS' : 'Happ, Win, Mac, iOS'}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/sub')}
            style={{
              ...glass({ padding: '14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, minHeight: 92, cursor: 'pointer', position: 'relative', overflow: 'hidden' }),
              background: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Settings2 size={15} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.3, lineHeight: 1.2 }}>
                {lang === 'ru' ? 'ПОДПИСКА' : 'PLAN'}
              </p>
              <p style={{ fontSize: 9.5, color: TEXT2, marginTop: 2, lineHeight: 1.3 }}>
                {lang === 'ru' ? 'Тарифы и оплата' : 'Plans & billing'}
              </p>
            </div>
          </button>
        </div>
      )}

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
          <button
            onClick={() => navigate('/sub')}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '4px 10px',
              color: TEXT2, fontSize: 10, fontFamily: 'monospace', fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {lang === 'ru' ? 'ПРОДЛИТЬ →' : 'RENEW →'}
          </button>
        </div>
      )}

    </div>
  )
}