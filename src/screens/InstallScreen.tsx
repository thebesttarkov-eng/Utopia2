import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Download, CloudDownload, CheckCircle2, ChevronDown, ExternalLink,
  QrCode, Monitor, Apple, Smartphone, Cpu,
} from 'lucide-react'
import { useLang } from '../i18n/LangContext'

// ── Palette ───────────────────────────────────────────────
const G      = '#FFFFFF'
const GDim   = 'rgba(255,255,255,0.4)'
const TEXT   = '#FFFFFF'
const TEXT2  = '#B0B0B0'
const MUTED  = '#808080'
const TILE   = 'rgba(26,26,26,0.85)'


// ── MOCK subscription URL (TODO: из API после покупки) ────
const MOCK_SUB_URL = 'https://utopia-vpn.net/sub/u_a3f2e1c5'

// ── Platforms / clients ───────────────────────────────────
type ClientId = 'happ' | 'incy' | 'prizrak' | 'fiflashx' | 'koala' | 'v2rayn' |
                'streisand' | 'foxray' | 'v2box' | 'v2rayng' | 'hiddify' | 'nekobox' |
                'v2raya' | 'nekoray'

interface Client {
  id: ClientId
  name: string
  mark: string            // 1-символьный маркер в квадрате
  downloadUrl: string
  scheme?: string         // URL scheme для import sub (без add/{base64})
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
  {
    id: 'windows', name: 'Windows', icon: Monitor,
    clients: [
      { id: 'happ',     name: 'Happ',       mark: 'H', downloadUrl: 'https://apps.microsoft.com/detail/9PDNL8W6WN26', scheme: 'happ', recommended: true },
      { id: 'incy',     name: 'INCY',       mark: 'IN', downloadUrl: 'https://github.com/InazumaV/V2bX/releases' },
      { id: 'prizrak',  name: 'Prizrak-Box',mark: '👻', downloadUrl: 'https://github.com/Prizrak-Box/releases' },
      { id: 'fiflashx', name: 'FlClashX',   mark: 'X', downloadUrl: 'https://github.com/chen08209/FlClash/releases' },
      { id: 'koala',    name: 'Koala Clash',mark: '🐨', downloadUrl: 'https://github.com/koalaclash/releases' },
      { id: 'v2rayn',   name: 'v2rayN',     mark: 'V', downloadUrl: 'https://github.com/2dust/v2rayN/releases/latest' },
    ],
  },
  {
    id: 'macos', name: 'macOS', icon: Apple,
    clients: [
      { id: 'happ',     name: 'Happ',     mark: 'H', downloadUrl: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215', scheme: 'happ', recommended: true },
      { id: 'v2box',    name: 'V2Box',    mark: 'V', downloadUrl: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690' },
      { id: 'fiflashx', name: 'FlClashX', mark: 'X', downloadUrl: 'https://github.com/chen08209/FlClash/releases' },
      { id: 'hiddify',  name: 'Hiddify',  mark: 'HD', downloadUrl: 'https://github.com/hiddify/hiddify-app/releases/latest' },
    ],
  },
  {
    id: 'ios', name: 'iOS', icon: Smartphone,
    clients: [
      { id: 'happ',      name: 'Happ',      mark: 'H', downloadUrl: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215', scheme: 'happ', recommended: true },
      { id: 'streisand', name: 'Streisand', mark: 'S', downloadUrl: 'https://apps.apple.com/app/streisand/id6450534064' },
      { id: 'v2box',     name: 'V2Box',     mark: 'V', downloadUrl: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690' },
      { id: 'foxray',    name: 'FoXray',    mark: 'F', downloadUrl: 'https://apps.apple.com/app/foxray/id6448898396' },
    ],
  },
  {
    id: 'android', name: 'Android', icon: Smartphone,
    clients: [
      { id: 'happ',    name: 'Happ',     mark: 'H', downloadUrl: 'https://play.google.com/store/apps/details?id=com.happproxy', scheme: 'happ', recommended: true },
      { id: 'v2rayng', name: 'v2rayNG',  mark: 'V', downloadUrl: 'https://play.google.com/store/apps/details?id=com.v2ray.ang' },
      { id: 'hiddify', name: 'Hiddify',  mark: 'HD', downloadUrl: 'https://play.google.com/store/apps/details?id=app.hiddify.com' },
      { id: 'nekobox', name: 'NekoBox',  mark: 'N', downloadUrl: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases' },
    ],
  },
  {
    id: 'linux', name: 'Linux', icon: Cpu,
    clients: [
      { id: 'hiddify', name: 'Hiddify',  mark: 'HD', downloadUrl: 'https://github.com/hiddify/hiddify-app/releases/latest', recommended: true },
      { id: 'v2raya',  name: 'v2rayA',   mark: 'V2', downloadUrl: 'https://github.com/v2rayA/v2rayA/releases' },
      { id: 'nekoray', name: 'Nekoray',  mark: 'N', downloadUrl: 'https://github.com/MatsuriDayo/nekoray/releases' },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────
function buildImportUrl(scheme: string, subUrl: string): string {
  const encoded = btoa(unescape(encodeURIComponent(subUrl)))
  return `${scheme}://add/${encoded}`
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
    const tg = (window as { Telegram?: { WebApp?: { BackButton?: { show(): void; hide(): void; onClick(h: () => void): void; offClick(h: () => void): void } } } }).Telegram?.WebApp
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
      // Клиент без deep-link — просто показываем ссылку подписки
      navigator.clipboard.writeText(MOCK_SUB_URL).catch(() => {})
      alert(lang === 'ru'
        ? `Ссылка подписки скопирована. Добавьте её вручную в ${client.name}.`
        : `Subscription URL copied. Paste it manually into ${client.name}.`)
    }
  }

  const t = (ru: string, en: string) => lang === 'ru' ? ru : en

  return (
    <div className="screen" style={{ padding: '18px 13px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── Header: title + QR + platform dropdown ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h1 style={{ flex: 1, fontSize: 22, fontWeight: 800, color: G, letterSpacing: -0.2 }}>
          {t('Установка', 'Install')}
        </h1>

        <button
          onClick={() => setQrOpen(true)}
          aria-label="QR"
          style={{
            width: 42, height: 42, borderRadius: 12,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <QrCode size={18} color={G} />
        </button>

        {/* Platform dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              height: 42, padding: '0 12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: TEXT, fontSize: 13, fontWeight: 600,
              fontFamily: 'monospace',
            }}
          >
            <platform.icon size={15} color={G} />
            {platform.name}
            <ChevronDown size={14} color={TEXT2} style={{
              transform: dropdownOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }} />
          </button>

          {dropdownOpen && (
            <>
              <div
                onClick={() => setDropdownOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 10 }}
              />
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 11,
                minWidth: 160,
                background: 'rgba(18,18,18,0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 4,
                boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                animation: 'fade-up 0.18s ease both',
              }}>
                {PLATFORMS.map(p => {
                  const active = p.id === platformId
                  return (
                    <button
                      key={p.id}
                      onClick={() => { changePlatform(p.id); setDropdownOpen(false) }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px',
                        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                        borderRadius: 8,
                        color: active ? G : TEXT,
                        fontSize: 13, fontWeight: active ? 700 : 500,
                        fontFamily: 'monospace',
                      }}
                    >
                      <p.icon size={14} color={active ? G : TEXT2} />
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Client grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {platform.clients.map(c => {
          const active = c.id === selectedClient
          return (
            <button
              key={c.id}
              onClick={() => setSelectedClient(c.id)}
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 14px',
                background: active ? 'rgba(255,255,255,0.08)' : TILE,
                border: `1px solid ${active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 14,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: active ? '0 0 18px rgba(255,255,255,0.08)' : '0 8px 32px rgba(0,0,0,0.37)',
                transition: 'all 0.18s',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: active ? '#FFFFFF' : (c.recommended ? '#D0D0D0' : MUTED),
                  boxShadow: active ? '0 0 6px rgba(255,255,255,0.6)' : 'none',
                }} />
                <span style={{
                  fontSize: 14, fontWeight: 600,
                  color: active ? G : TEXT,
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {c.name}
                </span>
              </div>
              <span style={{
                fontSize: 13, fontWeight: 800,
                color: active ? G : MUTED,
                fontFamily: 'monospace',
                letterSpacing: -0.5,
              }}>
                {c.mark}
              </span>
              {c.recommended && !active && (
                <span style={{
                  position: 'absolute', top: -6, right: 8,
                  fontSize: 8, fontWeight: 700, letterSpacing: 0.8,
                  color: '#FFFFFF',
                  background: 'rgba(18,18,18,1)',
                  padding: '1px 6px', borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
                  TOP
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Step 1: Install ── */}
      <StepCard
        index={1}
        icon={<Download size={18} color={G} />}
        title={t('Установка приложения', 'Install the app')}
        desc={t(
          `Выберите подходящую версию для вашего устройства, нажмите на кнопку ниже и установите приложение.`,
          `Pick the version for your device, tap the button below and install it.`
        )}
      >
        <a
          href={client.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 12,
            color: G, fontSize: 13, fontWeight: 700,
            fontFamily: 'monospace',
            textDecoration: 'none',
          }}
        >
          <ExternalLink size={14} />
          {client.name} · {platform.name}
        </a>
      </StepCard>

      {/* ── Step 2: Add subscription ── */}
      <StepCard
        index={2}
        icon={<CloudDownload size={18} color={G} />}
        title={t('Добавление подписки', 'Add subscription')}
        desc={t(
          `Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.`,
          `Tap the button — the app opens and the subscription is imported automatically.`
        )}
      >
        <button
          onClick={openAddSubscription}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 16px',
            background: '#FFFFFF',
            color: '#0E0E0E',
            borderRadius: 12,
            fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
            fontFamily: 'monospace',
            boxShadow: '0 0 16px rgba(255,255,255,0.15)',
          }}
        >
          + {t('Добавить подписку', 'Add subscription')}
        </button>
        {!client.scheme && (
          <p style={{ marginTop: 8, fontSize: 11, color: '#B0B0B0', fontFamily: 'monospace' }}>
            ⚠ {t(
              `${client.name} не поддерживает авто-импорт — ссылка скопируется, вставьте вручную.`,
              `${client.name} does not support auto-import — link will be copied, paste manually.`
            )}
          </p>
        )}
      </StepCard>

      {/* ── Step 3: Connect ── */}
      <StepCard
        index={3}
        icon={<CheckCircle2 size={18} color={G} />}
        title={t('Подключение и использование', 'Connect and use')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12, color: TEXT2, lineHeight: 1.55 }}>
          <p>
            {t(
              `В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов.`,
              `In the main screen tap the big connect button in the center. Don't forget to pick a server from the list.`
            )}
          </p>
          <p>
            {t(
              `Для приложений Discord, Steam используйте режим `,
              `For apps like Discord or Steam use `
            )}
            <span style={{ color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 700 }}>TUN</span>
            {t(
              ` — он перехватывает трафик всех приложений. `,
              ` mode — it captures traffic of all apps. `
            )}
            <span style={{ color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 700 }}>Proxy</span>
            {t(
              ` обрабатывает только браузерные запросы.`,
              ` mode covers browser traffic only.`
            )}
          </p>
          <p>
            {t(
              `Для проверки серверов используйте иконку спидометра в заголовке подписки — подключайтесь к любому, который дал отклик.`,
              `Use the speedometer icon in the subscription header to test servers — connect to any responsive one.`
            )}
          </p>
        </div>
      </StepCard>

      {/* ── QR modal ── */}
      {qrOpen && (
        <div
          onClick={() => setQrOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,8,0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 320,
              background: 'rgba(18,18,18,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '22px 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
              boxShadow: '0 16px 60px rgba(0,0,0,0.7)',
            }}
          >
            <p style={{ fontSize: 11, fontFamily: 'monospace', color: MUTED, letterSpacing: 1.2, fontWeight: 700 }}>
              // {t('QR-КОД ПОДПИСКИ', 'SUBSCRIPTION QR')}
            </p>
            <div style={{
              width: 200, height: 200,
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(255,255,255,0.15)',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: GDim, fontSize: 12, fontFamily: 'monospace', textAlign: 'center', padding: 20,
            }}>
              {t('QR-код появится после подключения API панели', 'QR will appear after panel API is wired')}
            </div>
            <p style={{ fontSize: 11, color: TEXT2, textAlign: 'center', lineHeight: 1.5 }}>
              {t(
                'Отсканируйте с телефона через Happ, чтобы импортировать подписку одним действием.',
                'Scan from your phone in Happ to import the subscription in one action.'
              )}
            </p>
            <button
              onClick={() => setQrOpen(false)}
              style={{
                marginTop: 4, padding: '8px 18px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, color: G,
                fontSize: 12, fontWeight: 700, fontFamily: 'monospace',
              }}
            >
              {t('ЗАКРЫТЬ', 'CLOSE')}
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

// ── Step card ─────────────────────────────────────────────
function StepCard({ index, icon, title, desc, children }: {
  index: number
  icon: React.ReactNode
  title: string
  desc?: string
  children?: React.ReactNode
}) {
  return (
    <div style={{
      background: 'rgba(26, 26, 26, 0.85)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 18,
      padding: '16px 16px',
      display: 'flex', gap: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.37)',
    }}>
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
          background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.2)',
          fontSize: 10, fontWeight: 800, color: G, fontFamily: 'monospace',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {index}
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: G, marginBottom: 6, letterSpacing: -0.1 }}>
          {title}
        </h3>
        {desc && (
          <p style={{ fontSize: 12, color: TEXT2, lineHeight: 1.55, marginBottom: children ? 12 : 0 }}>
            {desc}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
