import { useState } from 'react'
import { ArrowLeft, Download, Plus, CheckCircle, ExternalLink } from 'lucide-react'

const C = {
  bg: '#0A0A12', surface: '#13101F', card: '#1A1530',
  border: '#2D2550', primary: '#7C3AED', primaryLight: '#A78BFA',
  gold: '#F59E0B', text: '#F1F0FF', muted: '#7C7A96', success: '#10B981',
}

const CLIENTS = [
  { name: 'Happ', icon: '🅷', color: '#10B981', recommended: true },
  { name: 'INCY', icon: 'IN', color: '#10B981', recommended: true },
  { name: 'Prizrak-Box', icon: '👻', color: '#6B7280' },
  { name: 'FlClashX', icon: '✕', color: '#6B7280' },
  { name: 'Koala Clash', icon: '🐨', color: '#6B7280' },
  { name: 'v2rayN', icon: 'V', color: '#6B7280' },
]

interface Props {
  onBack: () => void
  subLink?: string
}

export default function InstallGuide({ onBack }: Props) {
  const [selectedClient, setSelectedClient] = useState('Happ')
  const [platform, setPlatform] = useState<'Windows' | 'Android' | 'iOS'>('Windows')

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Back header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            color: C.primaryLight, fontSize: 14, fontWeight: 600, padding: 0,
          }}
        >
          <ArrowLeft size={18} /> Назад
        </button>

        {/* Platform switcher */}
        <div style={{
          display: 'flex', background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, overflow: 'hidden',
        }}>
          {(['Windows', 'Android', 'iOS'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                background: platform === p ? C.primary : 'none',
                border: 'none', cursor: 'pointer', padding: '6px 12px',
                fontSize: 12, fontWeight: 600,
                color: platform === p ? '#fff' : C.muted,
              }}
            >{p}</button>
          ))}
        </div>
      </div>

      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.text }}>Установка</h1>

      {/* Client grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {CLIENTS.map(({ name, icon, color, recommended }) => (
          <button
            key={name}
            onClick={() => setSelectedClient(name)}
            style={{
              background: selectedClient === name ? 'rgba(124,58,237,0.2)' : C.card,
              border: `1px solid ${selectedClient === name ? C.primary : C.border}`,
              borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {recommended && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.success }} />
              )}
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{name}</span>
            </div>
            <span style={{
              width: 28, height: 28, borderRadius: 8,
              background: `${color}22`, border: `1px solid ${color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color,
            }}>{icon}</span>
          </button>
        ))}
      </div>

      {/* Step 1 */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'rgba(124,58,237,0.2)', border: `1px solid rgba(124,58,237,0.3)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Download size={18} color={C.primaryLight} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: C.primaryLight }}>
              Установка приложения
            </p>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              Выберите подходящую версию для вашего устройства и установите приложение.
            </p>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 8, padding: '8px 14px', cursor: 'pointer', color: C.primaryLight,
              fontSize: 13, fontWeight: 600,
            }}>
              <ExternalLink size={14} /> {platform}
            </button>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'rgba(124,58,237,0.2)', border: `1px solid rgba(124,58,237,0.3)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Plus size={18} color={C.primaryLight} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: C.primaryLight }}>
              Добавление подписки
            </p>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.
            </p>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: `linear-gradient(135deg, ${C.primary}, #9333EA)`,
              border: 'none', borderRadius: 8, padding: '8px 14px',
              cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 600,
            }}>
              <Plus size={14} /> Добавить подписку
            </button>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'rgba(16,185,129,0.15)', border: `1px solid rgba(16,185,129,0.3)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle size={18} color={C.success} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: C.success }}>
              Подключение и использование
            </p>
            <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
              В главном разделе нажмите большую кнопку включения для подключения к VPN.
              Не забудьте выбрать сервер в списке серверов.{'\n\n'}
              Для работы приложений как Discord, Steam используйте режим TUN —
              он перехватывает трафик всех приложений.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

