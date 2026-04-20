import type { CSSProperties, ReactNode } from 'react'
import { useLang } from '../i18n/LangContext'

const TEXT = '#FFFFFF'
const TEXT2 = '#B0B0B0'
const MUTED = '#808080'
const LINE = 'rgba(255,255,255,0.10)'
const PANEL = 'rgba(26, 26, 26, 0.50)'
const CRIMSON = '#8F1D1D'
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

type Variant = {
  id: string
  titleRu: string
  titleEn: string
  textRu: string
  textEn: string
  mark: ReactNode
}

function PortalMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-portal-u" x1="24" y1="18" x2="72" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.58" stopColor="#DDEBFF" />
          <stop offset="1" stopColor="#4B83FF" />
        </linearGradient>
      </defs>
      <rect x="12" y="10" width="72" height="76" rx="24" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.16)" />
      <path d="M28 28V53C28 65 36 73 48 73S68 65 68 53V28" stroke="url(#logo-portal-u)" strokeWidth="9" strokeLinecap="round" />
      <path d="M48 31V68" stroke="rgba(255,255,255,0.52)" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 78C44 81 52 81 58 78" stroke="rgba(255,255,255,0.34)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IslandMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="35" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.15)" />
      <path d="M29 30V52C29 64 37 71 48 71S67 64 67 52V30" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
      <path d="M32 58C39 54 57 54 64 58" stroke="rgba(92,145,255,0.78)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="48" cy="48" r="3" fill="#DDEBFF" />
    </svg>
  )
}

function OrbitMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <path d="M20 28V52C20 69 31 80 48 80S76 69 76 52V28" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
      <path d="M14 54C26 31 66 20 82 35C96 48 68 73 31 73" stroke="rgba(92,145,255,0.72)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 55C29 70 68 76 82 60" stroke="rgba(255,255,255,0.28)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="82" cy="35" r="3" fill="#FFFFFF" />
    </svg>
  )
}

function KeyMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <rect x="14" y="12" width="68" height="72" rx="22" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.14)" />
      <path d="M29 27V51C29 64 37 72 48 72S67 64 67 51V27" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
      <path d="M48 32V58" stroke="rgba(92,145,255,0.84)" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 58H58" stroke="rgba(92,145,255,0.84)" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 65H55" stroke="rgba(255,255,255,0.38)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MonolithMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <rect x="16" y="12" width="64" height="72" rx="8" fill="#FFFFFF" />
      <path d="M31 27V50C31 61 38 68 48 68S65 61 65 50V27" stroke="#0E0E0E" strokeWidth="9" strokeLinecap="round" />
      <path d="M48 31V62" stroke="rgba(14,14,14,0.45)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function QuietHorizonMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-horizon" x1="22" y1="28" x2="74" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.58" stopColor="#DDEBFF" />
          <stop offset="1" stopColor="#5C91FF" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="34" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.15)" />
      <path d="M25 55C34 42 62 42 71 55" stroke="url(#logo-horizon)" strokeWidth="5" strokeLinecap="round" />
      <path d="M31 62H65" stroke="rgba(255,255,255,0.52)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="48" cy="46" r="4" fill="#FFFFFF" />
    </svg>
  )
}

function SilentRouteMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <rect x="13" y="13" width="70" height="70" rx="22" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.14)" />
      <path d="M27 62C35 41 53 58 69 34" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M31 61C40 52 54 46 66 36" stroke="rgba(92,145,255,0.60)" strokeWidth="12" strokeLinecap="round" />
      <path d="M27 62C35 41 53 58 69 34" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="27" cy="62" r="5" fill="#0E0E0E" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="69" cy="34" r="5" fill="#0E0E0E" stroke="#DDEBFF" strokeWidth="3" />
    </svg>
  )
}

function HiddenGateMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <path d="M22 74V42C22 27 33 17 48 17S74 27 74 42V74" stroke="rgba(255,255,255,0.20)" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 74V43C30 32 37 25 48 25S66 32 66 43V74" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      <path d="M48 44V66" stroke="rgba(92,145,255,0.86)" strokeWidth="4" strokeLinecap="round" />
      <path d="M37 74H59" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="38" r="3" fill="#DDEBFF" />
    </svg>
  )
}

function CleanSignalMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="8" fill="#FFFFFF" />
      <path d="M36 48C36 41 41 36 48 36S60 41 60 48" stroke="rgba(255,255,255,0.82)" strokeWidth="4" strokeLinecap="round" />
      <path d="M27 48C27 36 36 27 48 27S69 36 69 48" stroke="rgba(221,235,255,0.58)" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 48C18 31 31 18 48 18S78 31 78 48" stroke="rgba(92,145,255,0.50)" strokeWidth="4" strokeLinecap="round" />
      <path d="M36 67H60" stroke="rgba(255,255,255,0.34)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function NorthStarMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <rect x="15" y="15" width="66" height="66" rx="20" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.14)" />
      <path d="M48 19L55 41L77 48L55 55L48 77L41 55L19 48L41 41L48 19Z" fill="#FFFFFF" />
      <path d="M48 31L52 44L65 48L52 52L48 65L44 52L31 48L44 44L48 31Z" fill="#0E0E0E" />
      <circle cx="48" cy="48" r="4" fill="#5C91FF" />
    </svg>
  )
}

function SkullVeilMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <path d="M48 16C65 16 76 29 76 47C76 58 71 65 64 69V78C64 81 62 83 59 83H37C34 83 32 81 32 78V69C25 65 20 58 20 47C20 29 31 16 48 16Z" fill="rgba(255,255,255,0.92)" />
      <path d="M28 49C38 40 58 40 68 49" stroke={CRIMSON} strokeWidth="9" strokeLinecap="round" />
      <path d="M31 49C41 45 55 45 65 49" stroke="rgba(14,14,14,0.72)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="38" cy="52" rx="7" ry="8" fill="#0E0E0E" />
      <ellipse cx="58" cy="52" rx="7" ry="8" fill="#0E0E0E" />
      <path d="M48 58L44 67H52L48 58Z" fill="#0E0E0E" />
      <path d="M38 74H58" stroke="#0E0E0E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CrownVoidMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <path d="M22 34L31 20L41 34L48 16L55 34L65 20L74 34V44H22V34Z" fill="rgba(255,255,255,0.92)" />
      <path d="M29 43H67L61 78H35L29 43Z" fill="rgba(255,255,255,0.90)" />
      <path d="M38 55C42 50 54 50 58 55C57 65 53 71 48 76C43 71 39 65 38 55Z" fill="#0E0E0E" />
      <circle cx="32" cy="34" r="2.4" fill={GOLD} />
      <circle cx="48" cy="28" r="2.8" fill={GOLD} />
      <circle cx="64" cy="34" r="2.4" fill={GOLD} />
    </svg>
  )
}

function CrimsonGateMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <path d="M24 78V43C24 27 34 18 48 18S72 27 72 43V78" stroke="rgba(255,255,255,0.88)" strokeWidth="7" strokeLinecap="round" />
      <path d="M35 78V45C35 36 40 30 48 30S61 36 61 45V78" stroke="#0E0E0E" strokeWidth="8" strokeLinecap="round" />
      <path d="M22 57C35 48 55 48 74 36" stroke={CRIMSON} strokeWidth="8" strokeLinecap="round" />
      <path d="M39 79H57" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function GoldRouteMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <rect x="14" y="14" width="68" height="68" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
      <path d="M24 63C34 36 55 62 72 32" stroke="rgba(143,29,29,0.76)" strokeWidth="12" strokeLinecap="round" />
      <path d="M24 63C34 36 55 62 72 32" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="24" cy="63" r="7" fill={GOLD} stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="72" cy="32" r="7" fill={GOLD} stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="48" cy="49" r="4" fill={GOLD} />
    </svg>
  )
}

function EngravedMaskMark() {
  return (
    <svg viewBox="0 0 96 96" width="86" height="86" fill="none" aria-hidden="true">
      <path d="M48 15C65 15 75 29 75 47C75 66 63 82 48 82S21 66 21 47C21 29 31 15 48 15Z" fill="rgba(255,255,255,0.92)" />
      <path d="M32 30C43 26 53 26 64 30" stroke="#0E0E0E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 40C42 36 54 36 65 40" stroke="#0E0E0E" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M33 51C43 47 53 47 63 51" stroke="#0E0E0E" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="48" cy="57" rx="9" ry="15" fill="#0E0E0E" />
      <path d="M31 73C40 78 56 78 65 73" stroke={CRIMSON} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const variants: Variant[] = [
  {
    id: 'portal',
    titleRu: 'U-портал',
    titleEn: 'U portal',
    textRu: 'Приватный проход в свободный интернет.',
    textEn: 'A private passage to the open internet.',
    mark: <PortalMark />,
  },
  {
    id: 'island',
    titleRu: 'U-остров',
    titleEn: 'U island',
    textRu: 'Личная тихая зона внутри сети.',
    textEn: 'A quiet personal zone inside the network.',
    mark: <IslandMark />,
  },
  {
    id: 'orbit',
    titleRu: 'U-орбита',
    titleEn: 'U orbit',
    textRu: 'Маршрут, доступ и движение вокруг мира.',
    textEn: 'Routing, access, and motion around the world.',
    mark: <OrbitMark />,
  },
  {
    id: 'key',
    titleRu: 'U-ключ',
    titleEn: 'U key',
    textRu: 'Ключ доступа как главный продукт сервиса.',
    textEn: 'The access key as the core product.',
    mark: <KeyMark />,
  },
  {
    id: 'monolith',
    titleRu: 'U-монолит',
    titleEn: 'U monolith',
    textRu: 'Строгий знак для более премиального образа.',
    textEn: 'A stricter mark for a more premium feel.',
    mark: <MonolithMark />,
  },
]

const philosophyVariants: Variant[] = [
  {
    id: 'quiet-horizon',
    titleRu: 'Тихий горизонт',
    titleEn: 'Quiet horizon',
    textRu: 'Utopia как спокойное личное пространство, где интернет открыт без шума.',
    textEn: 'Utopia as a calm personal space where the internet stays open.',
    mark: <QuietHorizonMark />,
  },
  {
    id: 'silent-route',
    titleRu: 'Тихий маршрут',
    titleEn: 'Silent route',
    textRu: 'Невидимый путь между пользователем и свободным интернетом.',
    textEn: 'An invisible path between the user and the open internet.',
    mark: <SilentRouteMark />,
  },
  {
    id: 'hidden-gate',
    titleRu: 'Скрытые ворота',
    titleEn: 'Hidden gate',
    textRu: 'Приватный вход в сеть, который выглядит не как обычный VPN-щит.',
    textEn: 'A private entrance to the network without the usual VPN shield.',
    mark: <HiddenGateMark />,
  },
  {
    id: 'clean-signal',
    titleRu: 'Чистый сигнал',
    titleEn: 'Clean signal',
    textRu: 'Стабильное подключение и ощущение контроля без технического шума.',
    textEn: 'Stable access and control without technical noise.',
    mark: <CleanSignalMark />,
  },
  {
    id: 'north-star',
    titleRu: 'Северная точка',
    titleEn: 'North point',
    textRu: 'Ориентир в заблокированном интернете: короткий, сильный, брендовый знак.',
    textEn: 'A fixed point in a blocked internet: short, strong, and brandable.',
    mark: <NorthStarMark />,
  },
]

const referenceImages = [
  '/logo-refs/skull-shadow.jpg',
  '/logo-refs/skull-veil.jpg',
  '/logo-refs/skull-square.jpg',
  '/logo-refs/memento-red.jpg',
]

const bottomCropImages = [
  { src: '/logo-refs/skull-veil.jpg', y: '78%' },
  { src: '/logo-refs/memento-red.jpg', y: '78%' },
  { src: '/logo-refs/skull-shadow.jpg', y: '72%' },
  { src: '/logo-refs/skull-square.jpg', y: '68%' },
]

const darkRenaissanceVariants: Variant[] = [
  {
    id: 'skull-veil',
    titleRu: 'Череп и вуаль',
    titleEn: 'Skull veil',
    textRu: 'Memento mori как символ приватности: лицо скрыто, доступ открыт.',
    textEn: 'Memento mori as privacy: the face is hidden, access remains open.',
    mark: <SkullVeilMark />,
  },
  {
    id: 'crown-void',
    titleRu: 'Корона пустоты',
    titleEn: 'Crown void',
    textRu: 'Премиальный знак без прямого VPN-смысла: власть, тишина и темный статус.',
    textEn: 'A premium mark beyond VPN: power, silence, and dark status.',
    mark: <CrownVoidMark />,
  },
  {
    id: 'crimson-gate',
    titleRu: 'Багровые ворота',
    titleEn: 'Crimson gate',
    textRu: 'Вход в закрытое пространство: красная ткань как приватная завеса.',
    textEn: 'An entrance into a closed space: red cloth as a privacy veil.',
    mark: <CrimsonGateMark />,
  },
  {
    id: 'gold-route',
    titleRu: 'Золотой маршрут',
    titleEn: 'Gold route',
    textRu: 'VPN как ценный маршрут: путь, ключевые точки и премиальный акцент.',
    textEn: 'VPN as a valuable route: path, key points, and a premium accent.',
    mark: <GoldRouteMark />,
  },
  {
    id: 'engraved-mask',
    titleRu: 'Гравюрная маска',
    titleEn: 'Engraved mask',
    textRu: 'Не череп в лоб, а знак скрытой личности и анонимности.',
    textEn: 'Not a direct skull, but a mark of hidden identity and anonymity.',
    mark: <EngravedMaskMark />,
  },
]

function RouteBrandSymbol({ size = 72, invert = false }: { size?: number; invert?: boolean }) {
  const primary = invert ? '#0E0E0E' : '#FFFFFF'
  const soft = invert ? 'rgba(14,14,14,0.18)' : 'rgba(255,255,255,0.18)'
  const blue = invert ? 'rgba(38,76,170,0.46)' : 'rgba(92,145,255,0.62)'

  return (
    <svg viewBox="0 0 96 96" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M23 63C32 39 53 58 70 32" stroke={blue} strokeWidth="15" strokeLinecap="round" />
      <path d="M23 63C32 39 53 58 70 32" stroke={primary} strokeWidth="5.4" strokeLinecap="round" />
      <circle cx="23" cy="63" r="8" fill={invert ? '#FFFFFF' : '#0E0E0E'} stroke={primary} strokeWidth="3" />
      <circle cx="70" cy="32" r="8" fill={invert ? '#FFFFFF' : '#0E0E0E'} stroke={primary} strokeWidth="3" />
      <path d="M34 70H62" stroke={soft} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function BrandSystemPreview({ lang }: { lang: 'ru' | 'en' }) {
  return (
    <section style={glass({
      padding: 16,
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(38,75,145,0.14), rgba(0,0,0,0.22))',
      border: '1px solid rgba(255,255,255,0.18)',
    })}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 82% 12%, rgba(92,145,255,0.28), transparent 34%), radial-gradient(circle at 0% 100%, rgba(255,255,255,0.10), transparent 32%)',
          backgroundSize: '220% 220%',
          animation: 'banner-flow 9s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase' }}>
            {lang === 'ru' ? '// БРЕНД-СИСТЕМА' : '// BRAND SYSTEM'}
          </p>
          <h2 style={{
            marginTop: 8,
            color: TEXT,
            fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            fontSize: 28,
            lineHeight: 1.05,
            letterSpacing: 0,
          }}>
            Quiet Route
          </h2>
          <p style={{ marginTop: 8, color: TEXT2, fontSize: 12, lineHeight: 1.45 }}>
            {lang === 'ru'
              ? 'Один знак, который можно использовать везде: приложение, Telegram, сайт, платежи и поддержка.'
              : 'One mark that works across the app, Telegram, website, payments, and support.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}>
          <div style={{
            gridColumn: '1 / -1',
            minHeight: 96,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.045)',
            border: '1px solid rgba(255,255,255,0.11)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: 14,
          }}>
            <div style={{
              width: 70,
              height: 70,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.055)',
              border: '1px solid rgba(255,255,255,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <RouteBrandSymbol size={58} />
            </div>
            <div>
              <p style={{
                color: TEXT,
                fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
                fontSize: 30,
                lineHeight: 1,
                letterSpacing: 0,
              }}>
                Utopia
              </p>
              <p style={{ marginTop: 6, color: TEXT2, fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                {lang === 'ru' ? 'Тихий доступ' : 'Quiet access'}
              </p>
            </div>
          </div>

          <div style={{
            height: 126,
            borderRadius: 8,
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: 12,
          }}>
            <RouteBrandSymbol size={62} invert />
            <p style={{ color: '#0E0E0E', fontSize: 10, fontFamily: 'monospace', fontWeight: 800, letterSpacing: 0.6 }}>
              APP ICON
            </p>
          </div>

          <div style={{
            height: 126,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            padding: 12,
          }}>
            <div style={{
              width: 74,
              height: 74,
              borderRadius: '50%',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(21,35,70,0.72))',
              border: '1px solid rgba(255,255,255,0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <RouteBrandSymbol size={58} />
            </div>
            <p style={{ color: TEXT2, fontSize: 10, fontFamily: 'monospace', fontWeight: 800, letterSpacing: 0.6 }}>
              TELEGRAM
            </p>
          </div>

          <div style={{
            gridColumn: '1 / -1',
            minHeight: 86,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.035)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            padding: 12,
          }}>
            <div>
              <p style={{ color: TEXT, fontSize: 13, fontWeight: 800, letterSpacing: 0 }}>
                {lang === 'ru' ? 'Utopia Access' : 'Utopia Access'}
              </p>
              <p style={{ marginTop: 4, color: TEXT2, fontSize: 10, lineHeight: 1.35 }}>
                {lang === 'ru' ? 'VPN-ключ для всех устройств' : 'VPN key for every device'}
              </p>
            </div>
            <div style={{
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '8px 10px',
              color: TEXT,
              fontFamily: 'monospace',
              fontSize: 10,
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}>
              @UtopiaVPN_bot
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LogoScreen() {
  const { lang } = useLang()

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <section style={glass({
        padding: 16,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025) 48%, rgba(0,0,0,0.18))',
      })}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 82% 28%, rgba(70,124,255,0.24), transparent 34%), radial-gradient(circle at 0% 0%, rgba(255,255,255,0.12), transparent 34%)',
            backgroundSize: '220% 220%',
            animation: 'banner-flow 8s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase' }}>
            {lang === 'ru' ? '// ЛОГОТИП' : '// LOGO'}
          </p>
          <h1 style={{
            marginTop: 8,
            color: TEXT,
            fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            fontSize: 30,
            lineHeight: 1.05,
            letterSpacing: 0,
          }}>
            Utopia
          </h1>
          <p style={{ marginTop: 8, maxWidth: 330, color: TEXT2, fontSize: 12, lineHeight: 1.45 }}>
            {lang === 'ru'
              ? 'Варианты знака по смыслу бренда: личное пространство, приватный проход и ключ доступа.'
              : 'Logo directions built around private space, a safe passage, and an access key.'}
          </p>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
        {variants.map((variant, index) => (
          <article
            key={variant.id}
            style={glass({
              padding: 14,
              display: 'grid',
              gridTemplateColumns: '94px 1fr',
              gap: 12,
              alignItems: 'center',
              background: index === 0
                ? 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(38,75,145,0.16), rgba(0,0,0,0.18))'
                : 'rgba(26,26,26,0.50)',
              border: index === 0 ? '1px solid rgba(255,255,255,0.18)' : `1px solid ${LINE}`,
            })}
          >
            <div style={{
              height: 94,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {variant.mark}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ color: TEXT, fontSize: 15, lineHeight: 1.2, fontWeight: 800, letterSpacing: 0 }}>
                  {lang === 'ru' ? variant.titleRu : variant.titleEn}
                </h2>
                {index === 0 && (
                  <span style={{
                    color: '#0E0E0E',
                    background: '#FFFFFF',
                    borderRadius: 6,
                    padding: '3px 6px',
                    fontSize: 8,
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    letterSpacing: 0.5,
                  }}>
                    {lang === 'ru' ? 'ЛУЧШИЙ' : 'BEST'}
                  </span>
                )}
              </div>
              <p style={{ marginTop: 6, color: TEXT2, fontSize: 11, lineHeight: 1.45 }}>
                {lang === 'ru' ? variant.textRu : variant.textEn}
              </p>
              <p style={{ marginTop: 8, color: MUTED, fontSize: 9, lineHeight: 1.4, fontFamily: 'monospace', letterSpacing: 0.5 }}>
                // {variant.id.toUpperCase()}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
        <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase' }}>
          {lang === 'ru' ? '// НОВАЯ ФИЛОСОФИЯ' : '// NEW PHILOSOPHY'}
        </p>
        <p style={{ color: TEXT2, fontSize: 11, lineHeight: 1.45 }}>
          {lang === 'ru'
            ? 'Эти варианты уже не про букву. Это отдельные символы для бренда: пространство, маршрут, вход, сигнал и ориентир.'
            : 'These are not letter marks. They are standalone brand symbols: space, route, gate, signal, and direction.'}
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
        {philosophyVariants.map((variant, index) => (
          <article
            key={variant.id}
            style={glass({
              padding: 14,
              display: 'grid',
              gridTemplateColumns: '94px 1fr',
              gap: 12,
              alignItems: 'center',
              background: index === 1
                ? 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(38,75,145,0.16), rgba(0,0,0,0.18))'
                : 'rgba(26,26,26,0.50)',
              border: index === 1 ? '1px solid rgba(255,255,255,0.18)' : `1px solid ${LINE}`,
            })}
          >
            <div style={{
              height: 94,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {variant.mark}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ color: TEXT, fontSize: 15, lineHeight: 1.2, fontWeight: 800, letterSpacing: 0 }}>
                  {lang === 'ru' ? variant.titleRu : variant.titleEn}
                </h2>
                {index === 1 && (
                  <span style={{
                    color: '#0E0E0E',
                    background: '#FFFFFF',
                    borderRadius: 6,
                    padding: '3px 6px',
                    fontSize: 8,
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    letterSpacing: 0.5,
                  }}>
                    {lang === 'ru' ? 'СИЛЬНЫЙ' : 'STRONG'}
                  </span>
                )}
              </div>
              <p style={{ marginTop: 6, color: TEXT2, fontSize: 11, lineHeight: 1.45 }}>
                {lang === 'ru' ? variant.textRu : variant.textEn}
              </p>
              <p style={{ marginTop: 8, color: MUTED, fontSize: 9, lineHeight: 1.4, fontFamily: 'monospace', letterSpacing: 0.5 }}>
                // {variant.id.toUpperCase()}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section style={glass({
        padding: 16,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.065), rgba(92,12,12,0.18), rgba(0,0,0,0.30))',
        border: '1px solid rgba(255,255,255,0.15)',
      })}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 800, textTransform: 'uppercase' }}>
              {lang === 'ru' ? '// ПО РЕФЕРЕНСАМ' : '// FROM REFERENCES'}
            </p>
            <h2 style={{
              marginTop: 8,
              color: TEXT,
              fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
              fontSize: 28,
              lineHeight: 1.05,
              letterSpacing: 0,
            }}>
              Dark Renaissance
            </h2>
            <p style={{ marginTop: 8, color: TEXT2, fontSize: 12, lineHeight: 1.45 }}>
              {lang === 'ru'
                ? 'Направление из твоих референсов: черный архив, гравюра, memento mori, багровая ткань и золото.'
                : 'A direction from your references: black archive, engraving, memento mori, crimson cloth, and gold.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {referenceImages.map((src) => (
              <div
                key={src}
                style={{
                  height: 76,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: '#0E0E0E',
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(1) contrast(1.16) brightness(0.72)',
                    opacity: 0.9,
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.035)',
            padding: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <p style={{ color: TEXT, fontSize: 11, fontFamily: 'monospace', fontWeight: 800, letterSpacing: 0.4 }}>
                {lang === 'ru' ? 'НИЖНИЙ КРОП' : 'BOTTOM CROP'}
              </p>
              <p style={{ color: MUTED, fontSize: 9, fontFamily: 'monospace', letterSpacing: 0.4 }}>
                {lang === 'ru' ? 'ДЛЯ БАННЕРА' : 'FOR BANNER'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 9 }}>
              {bottomCropImages.map(({ src, y }) => (
                <div
                  key={`${src}-${y}`}
                  style={{
                    height: 86,
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: '#0E0E0E',
                    position: 'relative',
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: `50% ${y}`,
                      filter: 'grayscale(0.84) contrast(1.24) brightness(0.62)',
                      opacity: 0.92,
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.38))',
                  }} />
                </div>
              ))}
            </div>
            <p style={{ marginTop: 9, color: TEXT2, fontSize: 10, lineHeight: 1.45 }}>
              {lang === 'ru'
                ? 'Низ можно использовать как атмосферу: фон, баннер, Telegram-обложка. Для основного знака лучше перерисовать символ, иначе логотип будет грязным в маленьком размере.'
                : 'The bottom crop works as atmosphere: background, banner, Telegram cover. The main logo should be redrawn, otherwise it gets muddy at small sizes.'}
            </p>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
        {darkRenaissanceVariants.map((variant, index) => (
          <article
            key={variant.id}
            style={glass({
              padding: 14,
              display: 'grid',
              gridTemplateColumns: '94px 1fr',
              gap: 12,
              alignItems: 'center',
              background: index === 2
                ? 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(123,20,20,0.22), rgba(0,0,0,0.22))'
                : 'rgba(26,26,26,0.50)',
              border: index === 2 ? '1px solid rgba(255,255,255,0.18)' : `1px solid ${LINE}`,
            })}
          >
            <div style={{
              height: 94,
              borderRadius: 8,
              background: 'radial-gradient(circle at 50% 28%, rgba(255,255,255,0.10), rgba(255,255,255,0.025) 58%, rgba(0,0,0,0.16))',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {variant.mark}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ color: TEXT, fontSize: 15, lineHeight: 1.2, fontWeight: 800, letterSpacing: 0 }}>
                  {lang === 'ru' ? variant.titleRu : variant.titleEn}
                </h2>
                {index === 2 && (
                  <span style={{
                    color: '#0E0E0E',
                    background: GOLD,
                    borderRadius: 6,
                    padding: '3px 6px',
                    fontSize: 8,
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    letterSpacing: 0.5,
                  }}>
                    {lang === 'ru' ? 'БРЕНД' : 'BRAND'}
                  </span>
                )}
              </div>
              <p style={{ marginTop: 6, color: TEXT2, fontSize: 11, lineHeight: 1.45 }}>
                {lang === 'ru' ? variant.textRu : variant.textEn}
              </p>
              <p style={{ marginTop: 8, color: MUTED, fontSize: 9, lineHeight: 1.4, fontFamily: 'monospace', letterSpacing: 0.5 }}>
                // {variant.id.toUpperCase()}
              </p>
            </div>
          </article>
        ))}
      </div>

      <BrandSystemPreview lang={lang} />
    </div>
  )
}
