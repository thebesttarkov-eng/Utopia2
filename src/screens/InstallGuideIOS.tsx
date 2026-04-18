import { ArrowLeft, Download, Copy, Plus, Power } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'

const G = '#39D353'
const TEXT = '#D4EDD4'
const TEXT2 = '#7AAA7A'
const MUTED = '#3A5A3A'

export default function InstallGuideIOS() {
  const navigate = useNavigate()
  const { lang } = useLang()

  const steps = [
    {
      num: 1,
      icon: Copy,
      title: lang === 'ru' ? 'Скопируйте ссылку подписки' : 'Copy subscription link',
      desc: lang === 'ru'
        ? 'Перейдите на вашу страницу профиля в приложении Ultima и нажмите на ссылку с вашей подпиской — она скопируется автоматически'
        : 'Go to your profile page in Ultima app and tap on your subscription link — it will be copied automatically',
    },
    {
      num: 2,
      icon: Download,
      title: lang === 'ru' ? 'Установите приложение' : 'Install the app',
      desc: lang === 'ru'
        ? 'Установите v2RayTun из App Store на ваш iPhone или iPad'
        : 'Install v2RayTun from App Store on your iPhone or iPad',
      links: [
        { name: 'v2RayTun', url: 'https://apps.apple.com/app/v2raytun/id6476628951' },
      ]
    },
    {
      num: 3,
      icon: Plus,
      title: lang === 'ru' ? 'Добавьте подписку' : 'Add subscription',
      desc: lang === 'ru'
        ? 'Запустите v2RayTun и нажмите на «+» в правом верхнем углу. Выберите «Добавить из буфера». Если программа спросит разрешение на вставку — разрешите'
        : 'Launch v2RayTun and tap «+» in the top right corner. Select «Add from clipboard». If the app asks for paste permission — allow it',
    },
    {
      num: 4,
      icon: Power,
      title: lang === 'ru' ? 'Подключитесь' : 'Connect',
      desc: lang === 'ru'
        ? 'На главном экране приложения появится подписка Ultima. Вы увидите список доступных локаций — нажмите на синюю кнопку для включения'
        : 'Ultima subscription will appear on the main screen. You will see a list of available locations — tap the blue button to connect',
    },
  ]

  return (
    <div style={{
      padding: '18px 13px 100px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minHeight: '100vh',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(57,211,83,0.08)',
            border: '1px solid rgba(57,211,83,0.2)',
            borderRadius: 10,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color={G} />
        </button>
        <div>
          <h1 style={{
            fontSize: 24,
            fontWeight: 900,
            color: G,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}>
            iOS
          </h1>
          <p style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>
            {lang === 'ru' ? 'Инструкция по установке' : 'Installation guide'}
          </p>
        </div>
      </div>

      {/* Platform badge */}
      <div style={{
        background: 'rgba(8,22,8,0.97)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(57,211,83,0.32)',
        borderRadius: 16,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'rgba(57,211,83,0.1)',
          border: '1px solid rgba(57,211,83,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}>

        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: 'monospace' }}>
            iPhone / iPad
          </p>
          <p style={{ fontSize: 11, color: TEXT2, marginTop: 2 }}>
            iOS 14.0+
          </p>
        </div>
        <div style={{
          background: 'rgba(57,211,83,0.1)',
          border: '1px solid rgba(57,211,83,0.28)',
          borderRadius: 8,
          padding: '4px 10px',
          fontSize: 10,
          color: G,
          fontWeight: 700,
          fontFamily: 'monospace',
          letterSpacing: 0.5,
        }}>
          ACTIVE
        </div>
      </div>

      {/* Steps */}
      {steps.map((step, i) => (
        <div key={i} style={{
          background: 'rgba(8,22,8,0.97)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(57,211,83,0.32)',
          borderRadius: 16,
          padding: '16px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Step number corner */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 900,
            color: 'rgba(57,211,83,0.08)',
            fontFamily: 'monospace',
            pointerEvents: 'none',
          }}>
            {step.num}
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            {/* Icon */}
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'rgba(57,211,83,0.1)',
              border: '1px solid rgba(57,211,83,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <step.icon size={20} color={G} />
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontSize: 10,
                  color: MUTED,
                  fontFamily: 'monospace',
                  letterSpacing: 1,
                  fontWeight: 700,
                }}>
                  ШАГ {step.num}
                </span>
              </div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 800,
                color: TEXT,
                marginBottom: 6,
                fontFamily: 'monospace',
                letterSpacing: 0.3,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 13,
                color: TEXT2,
                lineHeight: 1.5,
                marginBottom: step.links ? 12 : 0,
              }}>
                {step.desc}
              </p>

              {/* Links */}
              {step.links && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {step.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 14px',
                        borderRadius: 8,
                        background: 'rgba(57,211,83,0.15)',
                        border: '1px solid rgba(57,211,83,0.35)',
                        color: G,
                        fontSize: 12,
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontFamily: 'monospace',
                        letterSpacing: 0.3,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
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
        </div>
      ))}

      {/* Info tip */}
      <div style={{
        background: 'rgba(57,211,83,0.05)',
        border: '1px solid rgba(57,211,83,0.15)',
        borderRadius: 12,
        padding: '12px 14px',
        marginTop: 8,
      }}>
        <p style={{
          fontSize: 11,
          color: TEXT2,
          lineHeight: 1.6,
          fontFamily: 'monospace',
        }}>
          💡 {lang === 'ru'
            ? 'Если у вас подписка на несколько устройств — просто отправьте ссылку другу, он сможет использовать её без входа в бот'
            : 'If you have a multi-device subscription — just send the link to a friend, they can use it without logging into the bot'}
        </p>
      </div>

      {/* Footer tip */}
      <div style={{
        background: 'rgba(57,211,83,0.05)',
        border: '1px solid rgba(57,211,83,0.15)',
        borderRadius: 12,
        padding: '12px 14px',
      }}>
        <p style={{
          fontSize: 11,
          color: TEXT2,
          lineHeight: 1.6,
          fontFamily: 'monospace',
        }}>
          💡 {lang === 'ru'
            ? 'Если возникли проблемы — напишите в поддержку через бот'
            : 'If you have issues — contact support via bot'}
        </p>
      </div>

    </div>
  )
}
