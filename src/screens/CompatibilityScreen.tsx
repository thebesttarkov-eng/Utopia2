import { useState, type CSSProperties } from 'react'
import { AlertTriangle, Check, ChevronDown, ChevronUp, Globe2, LockKeyhole, Save, ShieldOff } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { SymbolReveal } from '../components/SymbolReveal'

const TEXT = '#FFFFFF'
const TEXT2 = '#B0B0B0'
const MUTED = '#808080'
const ACCENT = '#FFFFFF'
const PANEL = 'rgba(26, 26, 26, 0.50)'
const STORAGE_KEY = 'utopia.compatibility.rules.v1'

type Preset = {
  id: string
  titleRu: string
  titleEn: string
  descRu: string
  descEn: string
  services: string[]
}

const PRESETS: Preset[] = [
  {
    id: 'banks_ru',
    titleRu: 'Российские банки',
    titleEn: 'Russian banks',
    descRu: 'Платежи, приложения банков и личные кабинеты.',
    descEn: 'Bank apps, payments and personal accounts.',
    services: [
      'Сбербанк', 'Т-Банк', 'ВТБ', 'Альфа-Банк', 'Газпромбанк', 'Райффайзен',
      'Озон Банк', 'Совкомбанк', 'Росбанк', 'МТС Банк',
    ],
  },
  {
    id: 'government',
    titleRu: 'Госуслуги и городские сервисы',
    titleEn: 'Government services',
    descRu: 'Госуслуги, налоги, медицина и городские порталы.',
    descEn: 'State, tax, medical and city portals.',
    services: ['Госуслуги', 'ФНС', 'Мос.ру', 'ЕМИАС', 'Почта России'],
  },
  {
    id: 'streaming_ru',
    titleRu: 'Стриминги и медиа',
    titleEn: 'Streaming and media',
    descRu: 'Видео, музыка и онлайн-кинотеатры.',
    descEn: 'Video, music and online cinemas.',
    services: ['Кинопоиск', 'IVI', 'Okko', 'Wink', 'KION', 'START', 'Premier', 'Rutube', 'VK Видео', 'Звук'],
  },
  {
    id: 'daily_apps',
    titleRu: 'Доставка, такси, покупки',
    titleEn: 'Delivery, taxi, shopping',
    descRu: 'Сервисы, где важны геолокация, платежи и антифрод.',
    descEn: 'Services where location, payments and anti-fraud matter.',
    services: [
      'Яндекс Go', 'Яндекс Еда', 'Delivery Club', 'Самокат', 'Купер',
      'Ozon', 'Wildberries', 'Авито', '2ГИС', 'CDEK',
    ],
  },
]

const ALL_IDS = PRESETS.flatMap(preset => preset.services)

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: PANEL,
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 18px 52px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)',
  borderRadius: 14,
  ...extra,
})

function loadSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set<string>(ALL_IDS)
    const parsed = JSON.parse(raw) as string[]
    return new Set(parsed.filter(id => ALL_IDS.includes(id)))
  } catch {
    return new Set<string>(ALL_IDS)
  }
}

export default function CompatibilityScreen() {
  const { lang } = useLang()
  const [selected, setSelected] = useState<Set<string>>(loadSelection)
  const [openPresetIds, setOpenPresetIds] = useState<Set<string>>(() => new Set(PRESETS.map(preset => preset.id)))
  const [saved, setSaved] = useState(false)

  const selectedCount = selected.size
  const totalCount = ALL_IDS.length
  const t = (ru: string, en: string) => lang === 'ru' ? ru : en

  const statusLabel = selectedCount === totalCount ? t('ВСЕ', 'ALL') : `${selectedCount}/${totalCount}`

  function toggleService(service: string) {
    setSaved(false)
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(service)) next.delete(service)
      else next.add(service)
      return next
    })
  }

  function togglePreset(preset: Preset) {
    setSaved(false)
    setSelected(prev => {
      const next = new Set(prev)
      const allEnabled = preset.services.every(service => next.has(service))
      preset.services.forEach(service => {
        if (allEnabled) next.delete(service)
        else next.add(service)
      })
      return next
    })
  }

  function togglePresetOpen(id: string) {
    setOpenPresetIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAll() {
    setSaved(false)
    setSelected(new Set(ALL_IDS))
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]))
    setSaved(true)
  }

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 10, color: ACCENT, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 700 }}>
            <SymbolReveal text="// UTOPIA.ROUTING" />
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: 0, marginTop: 2 }}>
            {t('Совместимость', 'Compatibility')}
          </h1>
        </div>
        <span style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.20)',
          borderRadius: 20,
          padding: '4px 10px',
          fontSize: 10,
          color: ACCENT,
          fontWeight: 700,
          fontFamily: 'monospace',
          letterSpacing: 0.5,
        }}>
          {statusLabel}
        </span>
      </div>

      <div style={glass({ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.14)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ShieldOff size={20} color={ACCENT} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.3 }}>
              {t('ВЫБЕРИТЕ, ЧЕМ ПОЛЬЗУЕТЕСЬ', 'SELECT WHAT YOU USE')}
            </p>
            <p style={{ fontSize: 11, color: TEXT2, marginTop: 3, lineHeight: 1.45 }}>
              {t(
                'Эти сайты и приложения будут идти напрямую, чтобы не нагружать VPN-серверы и не ломать привычные сервисы.',
                'These websites and apps will use direct routing to reduce VPN load and keep daily services stable.',
              )}
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.035)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 8,
          padding: 11,
          display: 'flex',
          gap: 9,
          alignItems: 'flex-start',
        }}>
          <AlertTriangle size={15} color={TEXT2} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 10.5, color: TEXT2, lineHeight: 1.55 }}>
            {t(
              'Важно: выбранные сервисы увидят ваш реальный IP-адрес. Это обязательный режим совместимости для стабильности серверов и корректной работы банков, доставок, гос-сервисов и медиа.',
              'Important: selected services will see your real IP address. This compatibility mode keeps servers stable and helps banks, delivery, government and media services work correctly.',
            )}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div
            style={{
              background: '#FFFFFF',
              color: '#0E0E0E',
              border: 'none',
              borderRadius: 8,
              padding: '11px',
              fontSize: 11,
              fontFamily: 'monospace',
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            {t('ОБЯЗАТЕЛЬНО ВКЛЮЧЕНО', 'REQUIRED ON')}
          </div>
          <button
            onClick={selectAll}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '11px',
              color: TEXT,
              fontSize: 11,
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            {t('ВЫБРАТЬ ВСЁ', 'SELECT ALL')}
          </button>
        </div>
      </div>

      {PRESETS.map(preset => {
        const title = lang === 'ru' ? preset.titleRu : preset.titleEn
        const desc = lang === 'ru' ? preset.descRu : preset.descEn
        const presetCount = preset.services.filter(service => selected.has(service)).length
        const allPresetSelected = presetCount === preset.services.length
        const open = openPresetIds.has(preset.id)

        return (
          <div key={preset.id} style={glass({ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => togglePreset(preset)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: allPresetSelected ? '#FFFFFF' : 'rgba(255,255,255,0.05)',
                  border: allPresetSelected ? 'none' : '1px solid rgba(255,255,255,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {allPresetSelected && <Check size={15} color="#0E0E0E" />}
              </button>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: TEXT, fontFamily: 'monospace', letterSpacing: 0.2 }}>
                  {title}
                </p>
                <p style={{ fontSize: 10, color: MUTED, marginTop: 2, lineHeight: 1.35 }}>
                  {desc}
                </p>
              </div>

              <button
                onClick={() => togglePresetOpen(preset.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 8,
                  padding: '7px 8px',
                  color: TEXT2,
                  fontSize: 10,
                  fontFamily: 'monospace',
                  flexShrink: 0,
                }}
              >
                {presetCount}/{preset.services.length}
                {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
            </div>

            {open && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                {preset.services.map(service => {
                  const active = selected.has(service)
                  return (
                    <button
                      key={service}
                      onClick={() => toggleService(service)}
                      style={{
                        minHeight: 38,
                        background: active ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.035)',
                        border: active ? '1px solid rgba(255,255,255,0.24)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8,
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        color: active ? TEXT : TEXT2,
                        fontSize: 10.5,
                        fontWeight: active ? 700 : 500,
                        fontFamily: 'monospace',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: active ? ACCENT : MUTED,
                        flexShrink: 0,
                      }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{service}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      <div style={glass({ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Globe2 size={16} color={ACCENT} />
          <p style={{ fontSize: 12, fontFamily: 'monospace', color: TEXT, fontWeight: 800 }}>
            {t('Мои правила', 'My rules')}
          </p>
        </div>
        <p style={{ fontSize: 10.5, color: MUTED, lineHeight: 1.5 }}>
          {t(
            'Дальше сюда можно добавить ручной ввод домена, IP или приложения. Сейчас сохраняются выбранные пресеты для быстрой интеграции.',
            'Manual domain, IP or app rules can be added here later. For now, selected presets are saved for quick integration.',
          )}
        </p>
      </div>

      <button
        onClick={save}
        style={{
          width: '100%',
          background: '#FFFFFF',
          color: '#0E0E0E',
          borderRadius: 8,
          padding: '14px',
          fontSize: 12,
          fontWeight: 850,
          letterSpacing: 0.3,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {saved ? <Check size={15} /> : <Save size={15} />}
        {saved ? t('СОХРАНЕНО', 'SAVED') : t('СОХРАНИТЬ ДЛЯ БЫСТРОЙ ИНТЕГРАЦИИ', 'SAVE FOR QUICK INTEGRATION')}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '4px 0 10px' }}>
        <LockKeyhole size={12} color={MUTED} />
        <p style={{ fontSize: 9.5, color: MUTED, fontFamily: 'monospace', textAlign: 'center' }}>
          {t('В будущем эти правила будут приходить с сервера вместе с подпиской.', 'Later these rules will come from the server with the subscription.')}
        </p>
      </div>
    </div>
  )
}
