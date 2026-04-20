import type { CSSProperties, ReactNode } from 'react'
import { useLang } from '../i18n/LangContext'

const TEXT = '#FFFFFF'
const TEXT2 = '#B0B0B0'
const MUTED = '#808080'
const PANEL = 'rgba(26, 26, 26, 0.50)'
const CRIMSON = '#8C1F1F'
const GOLD = '#C8A24A'

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: PANEL,
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 18px 52px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.10)',
  borderRadius: 8,
  ...extra,
})

type LayoutCard = {
  id: string
  titleRu: string
  titleEn: string
  textRu: string
  textEn: string
  accent: string
  render: ReactNode
}

function GridScene() {
  return (
    <div className="banner-scene banner-scene--grid">
      <div className="banner-scene__core" />
      <div className="banner-scene__grid" />
      <div className="banner-scene__marks banner-scene__marks--top-left">
        <span>A5</span>
        <i>+</i>
        <i>+</i>
        <i>+</i>
        <i>+</i>
        <i>+</i>
      </div>
      <div className="banner-scene__marks banner-scene__marks--top-right">
        <span>A5</span>
        <i>+</i>
        <i>+</i>
        <i>+</i>
        <i>+</i>
        <i>+</i>
      </div>
      <div className="banner-scene__marks banner-scene__marks--bottom-left">
        <span>A5</span>
        <i>+</i>
        <i>+</i>
        <i>+</i>
        <i>+</i>
      </div>
      <div className="banner-scene__marks banner-scene__marks--bottom-right">
        <span>A5</span>
        <i>+</i>
        <i>+</i>
        <i>+</i>
        <i>+</i>
      </div>
      <div className="banner-scene__labels">
        <b>B1</b>
        <b>B1</b>
        <b>B1</b>
        <b>B1</b>
      </div>
      <div className="banner-scene__signature">
        AE ONLY<br />MGRPH_TST_03
      </div>
      <div className="banner-scene__signature banner-scene__signature--right">
        ROMASHKIN.XYZ
      </div>
      <div className="banner-scene__fade" />
    </div>
  )
}

function WaveScene() {
  return (
    <div className="banner-scene banner-scene--waves">
      <div className="banner-scene__core banner-scene__core--soft" />
      <div className="banner-scene__wave banner-scene__wave--1" />
      <div className="banner-scene__wave banner-scene__wave--2" />
      <div className="banner-scene__wave banner-scene__wave--3" />
      <div className="banner-scene__fade" />
    </div>
  )
}

function WireScene() {
  return (
    <div className="banner-scene banner-scene--wire">
      <div className="banner-scene__core banner-scene__core--wire" />
      <div className="banner-scene__wireframe" />
      <div className="banner-scene__fade" />
    </div>
  )
}

function VeilScene() {
  return (
    <div className="banner-scene banner-scene--veil">
      <div className="banner-scene__core banner-scene__core--veil" />
      <div className="banner-scene__veil" />
      <div className="banner-scene__fade" />
    </div>
  )
}

function FluxScene() {
  return (
    <div className="banner-scene banner-scene--flux">
      <div className="banner-scene__core banner-scene__core--flux" />
      <div className="banner-scene__flux" />
      <div className="banner-scene__fade" />
    </div>
  )
}

const layouts: LayoutCard[] = [
  {
    id: 'grid-field',
    titleRu: 'Grid Field',
    titleEn: 'Grid Field',
    textRu: 'Сетка, метки и центр — самый близкий к твоему GIF старт.',
    textEn: 'Grid, markers, and center - the closest starting point to your GIF.',
    accent: '#5C91FF',
    render: <GridScene />,
  },
  {
    id: 'waves',
    titleRu: 'Wave Atmosphere',
    titleEn: 'Wave Atmosphere',
    textRu: 'Мягкие световые слои, как жидкий неон под стеклом.',
    textEn: 'Soft light layers like liquid neon under glass.',
    accent: '#DDEBFF',
    render: <WaveScene />,
  },
  {
    id: 'wireframe',
    titleRu: 'Wireframe Dome',
    titleEn: 'Wireframe Dome',
    textRu: 'Каркас глобуса и технический объем без лишней графики.',
    textEn: 'A globe frame and technical volume without extra graphics.',
    accent: '#FFFFFF',
    render: <WireScene />,
  },
  {
    id: 'veil',
    titleRu: 'Crimson Veil',
    titleEn: 'Crimson Veil',
    textRu: 'Багровый контраст для премиального футуризма.',
    textEn: 'Crimson contrast for premium futurism.',
    accent: CRIMSON,
    render: <VeilScene />,
  },
  {
    id: 'flux',
    titleRu: 'Photon Flux',
    titleEn: 'Photon Flux',
    textRu: 'Разноцветный световой разлом для самого смелого варианта.',
    textEn: 'A colorful light split for the boldest version.',
    accent: GOLD,
    render: <FluxScene />,
  },
]

function StageCard({ title, subtitle, accent, children }: { title: string; subtitle: string; accent: string; children: ReactNode }) {
  return (
    <section style={glass({
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.02) 48%, rgba(0,0,0,0.20))',
      minHeight: 258,
    })}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, position: 'relative', zIndex: 1 }}>
        <div>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.4, fontWeight: 800, textTransform: 'uppercase' }}>
            // FUTURE TEST
          </p>
          <h2 style={{ marginTop: 6, color: TEXT, fontSize: 20, lineHeight: 1, fontWeight: 800 }}>{title}</h2>
        </div>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent, boxShadow: `0 0 0 4px rgba(255,255,255,0.04)` }} />
      </div>
      <p style={{ position: 'relative', zIndex: 1, color: TEXT2, fontSize: 11, lineHeight: 1.45, maxWidth: 360 }}>
        {subtitle}
      </p>
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: 170,
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.035)',
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </section>
  )
}

export default function BannersScreen() {
  const { lang } = useLang()

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <section style={glass({
        padding: 16,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(38,75,145,0.14), rgba(0,0,0,0.22))',
        border: '1px solid rgba(255,255,255,0.18)',
      })}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase' }}>
            {lang === 'ru' ? '// БАННЕРЫ' : '// BANNERS'}
          </p>
          <h1 style={{
            marginTop: 8,
            color: TEXT,
            fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            fontSize: 29,
            lineHeight: 1.05,
            letterSpacing: 0,
          }}>
            Full futurism test
          </h1>
          <p style={{ marginTop: 8, color: TEXT2, fontSize: 12, lineHeight: 1.45, maxWidth: 420 }}>
            {lang === 'ru'
              ? 'Быстрый тест футуристического дизайна: сетка, шум, орбиты, стекло, неон и красный контраст.'
              : 'A fast futuristic design test: grid, noise, orbits, glass, neon, and crimson contrast.'}
          </p>
        </div>
      </section>

      <StageCard
        title="Central Stage"
        subtitle={lang === 'ru'
          ? 'Главная сцена для глобуса или другого центрального объекта.'
          : 'Main stage for a globe or any other central object.'}
        accent="#5C91FF"
      >
        <GridScene />
      </StageCard>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 10,
      }}>
        {layouts.slice(1).map((card) => (
          <section
            key={card.id}
            style={glass({
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 204,
            })}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div>
                <p style={{ fontSize: 9, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.3, fontWeight: 800, textTransform: 'uppercase' }}>
                  // {lang === 'ru' ? 'ПОДЛОЖКА' : 'UNDERLAY'}
                </p>
                <h2 style={{ marginTop: 5, color: TEXT, fontSize: 16, lineHeight: 1.1, fontWeight: 800 }}>
                  {card.titleRu}
                </h2>
              </div>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: card.accent, boxShadow: `0 0 0 4px rgba(255,255,255,0.04)` }} />
            </div>
            <p style={{ color: TEXT2, fontSize: 10.5, lineHeight: 1.45 }}>
              {lang === 'ru' ? card.textRu : card.textEn}
            </p>
            <div style={{ position: 'relative', flex: 1, minHeight: 118, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.035)' }}>
              {card.render}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
