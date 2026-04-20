import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Sparkles, Wand2 } from 'lucide-react'

type FontSample = {
  label: string
  family: string
  note: string
}

type TextEffect = {
  label: string
  className: string
  note: string
}

type LogoSample = {
  label: string
  className: string
  note: string
}

const SAMPLES: FontSample[] = [
  { label: 'Utopia Serif', family: 'Georgia, Cambria, "Times New Roman", serif', note: 'Мягко, дорого, брендово' },
  { label: 'Small Caps', family: '"Palatino Linotype", "Book Antiqua", Palatino, serif', note: 'Печатный, спокойный' },
  { label: 'Modern Serif', family: 'Baskerville, "Baskerville Old Face", Garamond, serif', note: 'Премиально и тонко' },
  { label: 'Mono Tech', family: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', note: 'Техно и строго' },
  { label: 'UI Sans', family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', note: 'Чисто и просто' },
  { label: 'Rounded Sans', family: 'Verdana, Geneva, Tahoma, sans-serif', note: 'Читаемо и нейтрально' },
  { label: 'Narrow Sans', family: '"Arial Narrow", Arial, sans-serif', note: 'Компактно для шапки' },
  { label: 'Neutral Sans', family: 'Helvetica, Arial, sans-serif', note: 'Минимально и привычно' },
  { label: 'Vintage Serif', family: 'Garamond, "Times New Roman", serif', note: 'Более литературно' },
  { label: 'Wide Tech', family: '"Trebuchet MS", "Segoe UI", sans-serif', note: 'Мягко и современно' },
]

const EFFECTS: TextEffect[] = [
  { label: 'Plain', className: 'fx-plain', note: 'Без эффекта' },
  { label: 'Glow', className: 'fx-glow', note: 'Мягкое свечение' },
  { label: 'Pulse', className: 'fx-pulse', note: 'Мерцание' },
  { label: 'Outline', className: 'fx-outline', note: 'Контур' },
  { label: 'Typewriter', className: 'fx-typewriter', note: 'Печатная линия' },
  { label: 'Float', className: 'fx-float', note: 'Лёгкое движение' },
  { label: 'Blur In', className: 'fx-blur-in', note: 'Появление из размытости' },
  { label: 'Shine', className: 'fx-shine', note: 'Блеск по тексту' },
]

const LOGOS: LogoSample[] = [
  { label: 'Original', className: 'logo-original', note: 'Исходная иллюстрация' },
  { label: 'Badge', className: 'logo-badge', note: 'Круглая иконка для бота' },
  { label: 'Dark Icon', className: 'logo-dark', note: 'Темный знак под интерфейс' },
  { label: 'Mono', className: 'logo-mono', note: 'Серый VPN-стиль' },
  { label: 'Red Focus', className: 'logo-red', note: 'Красная ткань как акцент' },
  { label: 'Wordmark', className: 'logo-wordmark', note: 'Знак рядом с Utopia' },
]

const SKULL_LOGO = '/utopia-skull-logo.png'

export default function FontsScreen() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(0)
  const [selectedEffect, setSelectedEffect] = useState(1)
  const [selectedLogo, setSelectedLogo] = useState(1)
  const active = SAMPLES[selected] ?? SAMPLES[0]
  const effect = EFFECTS[selectedEffect] ?? EFFECTS[0]
  const logo = LOGOS[selectedLogo] ?? LOGOS[0]
  const activeFamily = useMemo(() => active.family, [active.family])

  return (
    <div className="screen" style={{ padding: '16px 13px 92px', gap: 12 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={16} color="#FFFFFF" />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 10, color: '#808080', fontFamily: 'monospace', letterSpacing: 1.4, fontWeight: 700 }}>
            FONT PREVIEW
          </p>
          <h1 style={{ fontSize: 22, color: '#FFFFFF', fontWeight: 800, letterSpacing: 0, marginTop: 2 }}>
            Utopia
          </h1>
        </div>
        <span style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 20,
          padding: '4px 9px',
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: 700,
          fontFamily: 'monospace',
        }}>
          {SAMPLES.length}
        </span>
      </div>

      <div style={{
        background: 'rgba(26,26,26,0.50)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <p style={{ color: '#B0B0B0', fontSize: 13, lineHeight: 1.45 }}>
          Выбери вариант глазами. Клик по карточке выделяет его и показывает отдельный живой предпросмотр сверху.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
          <div style={{
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.10)',
            padding: 12,
            background: 'rgba(255,255,255,0.03)',
          }}>
            <p style={{ fontSize: 10, color: '#808080', fontFamily: 'monospace', letterSpacing: 1.2 }}>
              BRAND
            </p>
            <p style={{
              marginTop: 6,
              fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
              fontSize: 30,
              lineHeight: 1,
              color: '#FFFFFF',
              fontWeight: 700,
            }}>
              Utopia
            </p>
          </div>
          <div style={{
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.10)',
            padding: 12,
            background: 'rgba(255,255,255,0.03)',
          }}>
            <p style={{ fontSize: 10, color: '#808080', fontFamily: 'monospace', letterSpacing: 1.2 }}>
              ALL CAPS
            </p>
            <p style={{
              marginTop: 6,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: 30,
              lineHeight: 1,
              color: '#FFFFFF',
              fontWeight: 800,
              letterSpacing: 1,
            }}>
              UTOPIA
            </p>
          </div>
        </div>

        <div style={{
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))',
          padding: 14,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Sparkles size={14} color="#FFFFFF" style={{ position: 'absolute', right: 12, top: 12, opacity: 0.45 }} />
          <p style={{ fontSize: 10, color: '#808080', fontFamily: 'monospace', letterSpacing: 1.2, fontWeight: 700 }}>
            ACTIVE SAMPLE
          </p>
          <div style={{
            marginTop: 8,
            fontFamily: activeFamily,
            fontSize: 34,
            lineHeight: 1,
            color: '#FFFFFF',
            fontWeight: 700,
            textShadow: '0 0 18px rgba(255,255,255,0.15)',
          }}>
            <span className={`preview-text ${effect.className}`}>Utopia</span>
          </div>
          <div style={{
            marginTop: 8,
            fontFamily: activeFamily,
            fontSize: 19,
            lineHeight: 1.25,
            color: '#CFCFCF',
            fontWeight: 500,
          }}>
            <span className={`preview-sub ${effect.className}`}>Твой тихий доступ к свободному интернету</span>
          </div>
          <div style={{
            marginTop: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 10px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#FFFFFF',
            fontSize: 10,
            fontFamily: 'monospace',
            letterSpacing: 0.4,
            width: 'fit-content',
          }}>
            <CheckCircle2 size={12} />
            {active.label}
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(26,26,26,0.50)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div>
            <p style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 800, fontFamily: 'monospace', letterSpacing: 0.3 }}>
              LOGO VARIANTS
            </p>
            <p style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>
              Череп как знак бренда, аватар и wordmark
            </p>
          </div>
          <span style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 20,
            padding: '4px 9px',
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'monospace',
          }}>
            {logo.label}
          </span>
        </div>

        <div style={{
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))',
          padding: 14,
          minHeight: 126,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <div className={`logo-stage ${logo.className}`}>
              <img src={SKULL_LOGO} alt="" />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontFamily: activeFamily,
                fontSize: 28,
                lineHeight: 1,
                color: '#FFFFFF',
                fontWeight: 700,
              }}>
                <span className={`preview-text ${effect.className}`}>Utopia</span>
              </p>
              <p style={{ marginTop: 6, fontSize: 10.5, color: '#B0B0B0', lineHeight: 1.35 }}>
                {logo.note}
              </p>
            </div>
          </div>
          <div className={`logo-mini ${logo.className}`}>
            <img src={SKULL_LOGO} alt="" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
          {LOGOS.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setSelectedLogo(index)}
              style={{
                minHeight: 128,
                textAlign: 'left',
                background: selectedLogo === index
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
                  : 'rgba(255,255,255,0.03)',
                border: selectedLogo === index
                  ? '1px solid rgba(255,255,255,0.24)'
                  : '1px solid rgba(255,255,255,0.10)',
                borderRadius: 10,
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 10,
                transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                transform: selectedLogo === index ? 'translateY(-1px)' : 'translateY(0)',
              }}
            >
              <div className={`logo-tile ${item.className}`}>
                <img src={SKULL_LOGO} alt="" />
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 800, fontFamily: 'monospace', letterSpacing: 0.3 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>
                  {item.note}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: 'rgba(26,26,26,0.50)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Wand2 size={14} color="#FFFFFF" />
          <p style={{ fontSize: 11, fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace', letterSpacing: 0.3 }}>
            TEXT EFFECTS
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
          {EFFECTS.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setSelectedEffect(index)}
              style={{
                textAlign: 'left',
                background: selectedEffect === index
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
                  : 'rgba(255,255,255,0.03)',
                border: selectedEffect === index
                  ? '1px solid rgba(255,255,255,0.24)'
                  : '1px solid rgba(255,255,255,0.10)',
                borderRadius: 10,
                padding: 12,
                transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                transform: selectedEffect === index ? 'translateY(-1px)' : 'translateY(0)',
              }}
            >
              <p style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 800, fontFamily: 'monospace', letterSpacing: 0.3 }}>
                {item.label}
              </p>
              <p style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>
                {item.note}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
        {SAMPLES.map((sample, index) => (
          <button
            key={sample.label}
            onClick={() => setSelected(index)}
            style={{
              textAlign: 'left',
              background: selected === index
                ? 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
                : 'rgba(26,26,26,0.50)',
              border: selected === index
                ? '1px solid rgba(255,255,255,0.26)'
                : '1px solid rgba(255,255,255,0.10)',
              borderRadius: 14,
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              transform: selected === index ? 'translateY(-1px)' : 'translateY(0)',
              boxShadow: selected === index
                ? '0 14px 42px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)'
                : 'none',
              transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div>
                <p style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 800, fontFamily: 'monospace', letterSpacing: 0.3 }}>
                  {sample.label}
                </p>
                <p style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>
                  {sample.note}
                </p>
              </div>
              {selected === index && <CheckCircle2 size={16} color="#FFFFFF" />}
            </div>
              <div style={{
                fontFamily: sample.family,
                fontSize: 26,
                lineHeight: 1.1,
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: index === 1 ? 1.1 : 0,
                textShadow: selected === index ? '0 0 14px rgba(255,255,255,0.14)' : 'none',
              }}>
              <span className={`preview-text ${effect.className}`}>Utopia</span>
            </div>
            <div style={{
              fontFamily: sample.family,
              fontSize: 18,
              lineHeight: 1.1,
              color: '#B0B0B0',
              fontWeight: 500,
              letterSpacing: 0,
              opacity: selected === index ? 1 : 0.88,
            }}>
              <span className={`preview-sub ${effect.className}`}>Твой тихий доступ к свободному интернету</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
