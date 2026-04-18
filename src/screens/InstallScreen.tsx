import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Download, CloudDownload, CheckCircle2, ChevronDown, ExternalLink,
  QrCode, Monitor, Apple, Smartphone, Cpu,
} from 'lucide-react'
import { useLang } from '../i18n/LangContext'

// ── Palette (в стиле HomeScreen) ──────────────────────────
const G      = '#FFFFFF'
const MUTED  = '#808080'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'
const AMBER  = '#D0D0D0'

const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: 'rgba(26, 26, 26, 0.85)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  borderRadius: 12,
  ...extra,
})

// ── MOCK subscription URL ───────────────────────────────────
const MOCK_SUB_URL = 'https://utopia-vpn.net/sub/u_a3f2e1c5'

// ── Platforms / clients ────────────────────────────────────
type ClientId = 'happ' | 'incy' | 'prizrak' | 'fiflashx' | 'koala' | 'v2rayn' |
                'streisand' | 'foxray' | 'v2box' | 'v2rayng' | 'hiddify' | 'nekobox' |
                'v2raya' | 'nekoray'

interface Client {
  id: ClientId
  name: string
  mark: string
  downloadUrl: string
  scheme?: string
  recommended?: boolean
}

type PlatformId = 'windows' | 'macos' | 'ios' | 'android' | 'linux'

interface Platform {
  id: PlatformId
  name: string
  icon: typeof Monitor
  clients: Client[]
}

const PLATFORMS: Platform[] = [
  { id: 'windows', name: 'Windows', icon: Monitor, clients: [
    { id: 'happ', name: 'Happ', mark: 'H', downloadUrl: 'https://apps.microsoft.com/detail/9PDNL8W6WN26', scheme: 'happ', recommended: true },
    { id: 'incy', name: 'INCY', mark: 'IN', downloadUrl: 'https://github.com/InazumaV/V2bX/releases' },
    { id: 'prizrak', name: 'Prizrak-Box', mark: '👻', downloadUrl: 'https://github.com/Prizrak-Box/releases' },
    { id: 'fiflashx', name: 'FlClashX', mark: 'X', downloadUrl: 'https://github.com/chen08209/FlClash/releases' },
    { id: 'koala', name: 'Koala Clash', mark: '🐨', downloadUrl: 'https://github.com/koalaclash/releases' },
    { id: 'v2rayn', name: 'v2rayN', mark: 'V', downloadUrl: 'https://github.com/2dust/v2rayN/releases/latest' },
  ]},
  { id: 'macos', name: 'macOS', icon: Apple, clients: [
    { id: 'happ', name: 'Happ', mark: 'H', downloadUrl: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215', scheme: 'happ', recommended: true },
    { id: 'v2box', name: 'V2Box', mark: 'V', downloadUrl: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690' },
    { id: 'fiflashx', name: 'FlClashX', mark: 'X', downloadUrl: 'https://github.com/chen08209/FlClash/releases' },
    { id: 'hiddify', name: 'Hiddify', mark: 'HD', downloadUrl: 'https://github.com/hiddify/hiddify-app/releases/latest' },
  ]},
  { id: 'ios', name: 'iOS', icon: Smartphone, clients: [
    { id: 'happ', name: 'Happ', mark: 'H', downloadUrl: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215', scheme: 'happ', recommended: true },
    { id: 'streisand', name: 'Streisand', mark: 'S', downloadUrl: 'https://apps.apple.com/app/streisand/id6450534064' },
    { id: 'v2box', name: 'V2Box', mark: 'V', downloadUrl: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690' },
    { id: 'foxray', name: 'FoXray', mark: 'F', downloadUrl: 'https://apps.apple.com/app/foxray/id6448898396' },
  ]},
  { id: 'android', name: 'Android', icon: Smartphone, clients: [
    { id: 'happ', name: 'Happ', mark: 'H', downloadUrl: 'https://play.google.com/store/apps/details?id=com.happproxy', scheme: 'happ', recommended: true },
    { id: 'v2rayng', name: 'v2rayNG', mark: 'V', downloadUrl: 'https://play.google.com/store/apps/details?id=com.v2ray.ang' },
    { id: 'hiddify', name: 'Hiddify', mark: 'HD', downloadUrl: 'https://play.google.com/store/apps/details?id=app.hiddify.com' },
    { id: 'nekobox', name: 'NekoBox', mark: 'N', downloadUrl: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases' },
  ]},
  { id: 'linux', name: 'Linux', icon: Cpu, clients: [
    { id: 'hiddify', name: 'Hiddify', mark: 'HD', downloadUrl: 'https://github.com/hiddify/hiddify-app/releases/latest', recommended: true },
    { id: 'v2raya', name: 'v2rayA', mark: 'V2', downloadUrl: 'https://github.com/v2rayA/v2rayA/releases' },
    { id: 'nekoray', name: 'Nekoray', mark: 'N', downloadUrl: 'https://github.com/MatsuriDayo/nekoray/releases' },
  ]},
]

function buildImportUrl(scheme: string, subUrl: string): string {
  const encoded = btoa(unescape(encodeURIComponent(subUrl)))
  return `${scheme}://add/${encoded}`
}

// ── Client tile (в стиле HomeScreen Tile) ──────────────────
const ClientTile = memo(function ClientTile({ client, active, onClick }: {
  client: Client; active: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick} style={{
      ...glass({ padding: '14px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 88 }),
      border: active ? '1.5px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
      background: active ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
      transition: 'all 0.18s',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {client.recommended && !active && (
        <span style={{
          position: 'absolute', top: 0, right: 8,
          background: '#FFFFFF', color: '#0E0E0E',
          fontSize: 7, fontWeight: 800, fontFamily: 'monospace',
          padding: '1px 5px', borderRadius: '0 0 5px 5px', letterSpacing: 0.5,
        }}>TOP</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
          background: active ? G : (client.recommended ? AMBER : MUTED),
          boxShadow: active ? '0 0 6px rgba(255,255,255,0.6)' : 'none',
        }}/>
        <span style={{ fontSize: 12, fontWeight: 700, color: active ? G : TEXT, fontFamily: 'monospace' }}>
          {client.name}
        </span>
      </div>
      <span style={{ fontSize: 11, fontWeight: 800, color: active ? G : MUTED, fontFamily: 'monospace' }}>
        {client.mark}
      </span>
    </button>
  )
})

// ── Step card (в стиле HomeScreen glass) ──────────────────
function StepCard({ index, icon, title, desc, children }: {
  index: number; icon: React.ReactNode; title: string; desc?: string; children?: React.ReactNode
}) {
  return (
    <div style={glass({ padding: '14px 15px', display: 'flex', gap: 12 })}>
      <div style={{
        width: 36, height: 36, flexShrink: 0, borderRadius: 10,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {icon}
        <span style={{
          position: 'absolute', top: -7, left: -7,
          width: 18, height: 18, borderRadius: '50%',
          background: '#2A2A2A', border: '1px solid rgba(255,255,255,0.2)',
          fontSize: 10, fontWeight: 800, color: G, fontFamily: 'monospace',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{index}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 600, marginBottom: 2 }}>
          {String(index).padStart(2, '0')} {String(title).toUpperCase()}
        </p>
        {desc && (
          <p style={{ fontSize: 11, color: TEXT2, lineHeight: 1.5, marginBottom: children ? 10 : 0 }}>
            {desc}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────
export default function InstallScreen() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [platformId, setPlatformId] = useState<PlatformId>('windows')
  const [selectedClient, setSelectedClient] = useState<ClientId>('happ')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    if (tg?.BackButton) {
      tg.BackButton.show()
      const handler = () => navigate(-1)
      tg.BackButton.onClick(handler)
      return () => { tg.BackButton!.offClick(handler); tg.BackButton!.hide() }
    }
  }, [navigate])

  const platform = PLATFORMS.find(p => p.id === platformId)!
  const client = platform.clients.find(c => c.id === selectedClient) ?? platform.clients[0]

  function changePlatform(id: PlatformId) {
    const next = PLATFORMS.find(p => p.id === id)!
    setPlatformId(id)
    if (!next.clients.find(c => c.id === selectedClient)) {
      setSelectedClient(next.clients[0].id)
    }
  }

  function openAddSubscription() {
    if (client.scheme) {
      window.location.href = buildImportUrl(client.scheme, MOCK_SUB_URL)
    } else {
      navigator.clipboard.writeText(MOCK_SUB_URL).catch(() => {})
      alert(lang === 'ru'
        ? `Ссылка подписки скопирована. Добавьте её вручную в ${client.name}.`
        : `Subscription URL copied. Paste it manually into ${client.name}.`)
    }
  }

  const t = (ru: string, en: string) => lang === 'ru' ? ru : en

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Header (в стиле HomeScreen) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
            // UTOPIA.INSTALL
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT, letterSpacing: -0.2, marginTop: 2 }}>
            {t('Установка', 'Install')}
          </h1>
        </div>
        <span style={{
          background: '#2A2A2A', border: '1px solid #3A3A3A',
          borderRadius: 20, padding: '4px 10px',
          fontSize: 10, color: TEXT, fontWeight: 600, fontFamily: 'monospace', letterSpacing: 0.5,
        }}>
          {platform.name.toUpperCase()}
        </span>
      </div>

      {/* Platform tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {PLATFORMS.map(p => {
          const active = p.id === platformId
          return (
            <button
              key={p.id}
              onClick={() => changePlatform(p.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 12px',
                background: active ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.85)',
                border: `1px solid ${active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 10,
                color: active ? G : MUTED,
                fontSize: 11, fontWeight: 700, fontFamily: 'monospace',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p.icon size={12} color={active ? G : MUTED} />
              {p.name}
            </button>
          )
        })}
      </div>

      {/* Client grid 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {platform.clients.map(c => (
          <ClientTile
            key={c.id}
            client={c}
            active={c.id === selectedClient}
            onClick={() => setSelectedClient(c.id)}
          />
        ))}
      </div>

      {/* Step 1 */}
      <StepCard
        index={1}
        icon={<Download size={16} color={G} />}
        title={t('Установка', 'Install')}
        desc={t('Выберите версию для устройства и установите', 'Pick version for device and install')}
      >
        <a
          href={client.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: G, fontSize: 11, fontWeight: 700,
            fontFamily: 'monospace', textDecoration: 'none',
          }}
        >
          <ExternalLink size={12} />
          {client.name} · {platform.name}
        </a>
      </StepCard>

      {/* Step 2 */}
      <StepCard
        index={2}
        icon={<CloudDownload size={16} color={G} />}
        title={t('Подписка', 'Subscription')}
        desc={t('Нажмите — приложение откроется и подписка добавится', 'Tap — app opens and subscription imports')}
      >
        <button
          onClick={openAddSubscription}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 14px',
            background: '#FFFFFF', color: '#0E0E0E',
            borderRadius: 10,
            fontSize: 12, fontWeight: 800, letterSpacing: 0.3,
            fontFamily: 'monospace', border: 'none',
          }}
        >
          + {t('Добавить подписку', 'Add subscription')}
        </button>
        {!client.scheme && (
          <p style={{ marginTop: 6, fontSize: 10, color: MUTED, fontFamily: 'monospace' }}>
            ⚠ {client.name} — {t('вставьте ссылку вручную', 'paste link manually')}
          </p>
        )}
      </StepCard>

      {/* Step 3 */}
      <StepCard
        index={3}
        icon={<CheckCircle2 size={16} color={G} />}
        title={t('Подключение', 'Connect')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, color: TEXT2, lineHeight: 1.5 }}>
          <p>{t('Нажмите кнопку включения для подключения', 'Tap connect button to start')}</p>
          <p>
            {t('Discord, Steam → режим ', 'Discord, Steam → ')}
            <span style={{ color: G, fontFamily: 'monospace', fontWeight: 700 }}>TUN</span>
            {t(' — весь трафик', ' — all traffic')}
          </p>
        </div>
      </StepCard>

    </div>
  )
}

