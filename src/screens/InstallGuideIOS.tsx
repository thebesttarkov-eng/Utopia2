import { useLang } from '../i18n/LangContext'
import { Download, Copy, Plus, Power, CheckCircle2 } from 'lucide-react'
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
  borderRadius: 16,
  ...extra,
})

export default function InstallGuideIOS() {
  const { lang } = useLang()

  const steps = lang === 'ru'
    ? [
        { num: 1, icon: Copy,       title: 'Скопируйте ссылку подписки', desc: 'Перейдите на страницу профиля в боте и нажмите на ссылку подписки — она скопируется автоматически', links: [] },
        { num: 2, icon: Download,    title: 'Установите приложение',       desc: 'Установите v2RayTun из App Store на ваш iPhone или iPad', links: [{ name: 'v2RayTun', url: 'https://apps.apple.com/app/v2raytun/id6476628951' }] },
        { num: 3, icon: Plus,       title: 'Добавьте подписку',           desc: 'Запустите v2RayTun и нажмите «+» в правом верхнем углу. Выберите «Добавить из буфера». Если программа спросит разрешение — разрешите', links: [] },
        { num: 4, icon: Power,      title: 'Подключитесь',                desc: 'На главном экране появится подписка Utopia. Вы увидите список локаций — нажмите на кнопку для подключения', links: [] },
      ]
    : [
        { num: 1, icon: Copy,       title: 'Copy subscription link',      desc: 'Go to your profile page in the bot and tap the subscription link — it will be copied automatically', links: [] },
        { num: 2, icon: Download,    title: 'Install the app',              desc: 'Install v2RayTun from App Store on your iPhone or iPad', links: [{ name: 'v2RayTun', url: 'https://apps.apple.com/app/v2raytun/id6476628951' }] },
        { num: 3, icon: Plus,       title: 'Add subscription',             desc: 'Launch v2RayTun and tap «+» in the top right corner. Select «Add from clipboard». Allow paste permission if asked', links: [] },
        { num: 4, icon: Power,      title: 'Connect',                     desc: 'Utopia subscription will appear on the main screen. You\'ll see a list of locations — tap the button to connect', links: [] },
      ]

  return (
    <div className="screen" style={{ padding: '16px 13px 100px', display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 600 }}>
            // UTOPIA.INSTALL
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT, letterSpacing: -0.2, marginTop: 2 }}>
            {lang === 'ru' ? 'iOS' : 'iOS'}
          </h1>
        </div>
        <span style={{
          background: '#2A2A2A', border: `1px solid #3A3A3A`,
          borderRadius: 20, padding: '4px 10px',
          fontSize: 10, color: TEXT, fontWeight: 600, fontFamily: 'monospace', letterSpacing: 0.5,
        }}>
          iOS 14+
        </span>
      </div>

      {/* Platform card */}
      <div style={glass({ padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 12 })}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'rgba(255, 255, 255, 0.05)',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          🍎
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.4 }}>
            iPhone / iPad
          </p>
          <p style={{ fontSize: 10, color: MUTED, marginTop: 2, fontFamily: 'monospace', letterSpacing: 0.5 }}>
            v2RayTun
          </p>
        </div>
        <CheckCircle2 size={18} color={G} />
      </div>

      {/* Steps */}
      {steps.map((step, i) => (
        <div key={i} style={{
          ...glass({ padding: '14px 15px' }),
          display: 'flex', gap: 12,
          position: 'relative',
        }}>
          {/* Step badge */}
          <div style={{
            position: 'absolute', top: 10, right: 12,
            fontSize: 32, fontWeight: 900, color: 'rgba(255,255,255,0.04)',
            fontFamily: 'monospace', lineHeight: 1, userSelect: 'none',
          }}>
            {step.num}
          </div>

          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <step.icon size={16} color={G} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 600, marginBottom: 4 }}>
              // ШАГ {step.num}
            </p>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.2, marginBottom: 6 }}>
              {step.title}
            </h3>
            <p style={{ fontSize: 11, color: TEXT2, lineHeight: 1.5, marginBottom: step.links.length ? 10 : 0 }}>
              {step.desc}
            </p>
            {step.links.length > 0 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {step.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid rgba(255, 255, 255, 0.1)`,
                      borderRadius: 10,
                      color: TEXT, fontSize: 11, fontWeight: 700,
                      fontFamily: 'monospace', textDecoration: 'none',
                    }}
                  >
                    <Download size={12} />
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Tips */}
      <div style={glass({ padding: '12px 14px' })}>
        <p style={{ fontSize: 11, color: TEXT2, lineHeight: 1.6, fontFamily: 'monospace' }}>
          💡 {lang === 'ru'
            ? 'Если у вас подписка на несколько устройств — просто отправьте ссылку другу'
            : 'Multi-device? Just send the link to a friend — no bot login needed'}
        </p>
      </div>

      <div style={glass({ padding: '12px 14px' })}>
        <p style={{ fontSize: 11, color: TEXT2, lineHeight: 1.6, fontFamily: 'monospace' }}>
          💡 {lang === 'ru'
            ? 'Возникли проблемы? Напишите в поддержку через бот'
            : 'Having issues? Contact support via the bot'}
        </p>
      </div>

    </div>
  )
}
