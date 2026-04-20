import { useState, type CSSProperties } from 'react'
import { Check, Inbox, LifeBuoy, MessageCircle, Plus, Send, Ticket } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { SymbolReveal } from '../components/SymbolReveal'

const TEXT = '#FFFFFF'
const TEXT2 = '#B0B0B0'
const MUTED = '#808080'
const ACCENT = '#FFFFFF'
const PANEL = 'rgba(26, 26, 26, 0.50)'
const LINE = 'rgba(255,255,255,0.10)'
const STORAGE_KEY = 'utopia.support.tickets.v1'
const SUPPORT_BOT = '@UtopiaVPN_bot'

type TicketItem = {
  id: string
  category: string
  message: string
  createdAt: string
  status: 'new' | 'open'
}

const CATEGORIES = [
  'Не работает VPN',
  'Оплата',
  'Установка',
  'Скорость',
  'Ключ / подписка',
  'Другое',
]

const glass = (extra?: CSSProperties): CSSProperties => ({
  background: PANEL,
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 18px 52px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)',
  borderRadius: 14,
  ...extra,
})

function loadTickets(): TicketItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as TicketItem[]
  } catch {
    return []
  }
}

function saveTickets(tickets: TicketItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}

export default function SupportScreen() {
  const { lang } = useLang()
  const [tickets, setTickets] = useState<TicketItem[]>(loadTickets)
  const [composerOpen, setComposerOpen] = useState(false)
  const [category, setCategory] = useState(CATEGORIES[0])
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const t = (ru: string, en: string) => lang === 'ru' ? ru : en

  function createTicket() {
    const trimmed = message.trim()
    if (!trimmed) return

    const nextTicket: TicketItem = {
      id: `UT-${Date.now().toString().slice(-6)}`,
      category,
      message: trimmed,
      createdAt: new Date().toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      status: 'new',
    }
    const nextTickets = [nextTicket, ...tickets]
    setTickets(nextTickets)
    saveTickets(nextTickets)
    setMessage('')
    setComposerOpen(false)
    setSent(true)
    window.setTimeout(() => setSent(false), 1800)
  }

  function openTelegramSupport() {
    window.open('https://t.me/UtopiaVPN_bot', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="screen" style={{ padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: ACCENT, fontFamily: 'monospace', letterSpacing: 1.5, fontWeight: 700 }}>
            <SymbolReveal text="// UTOPIA.SUPPORT" />
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: 0, marginTop: 2 }}>
            {t('Поддержка', 'Support')}
          </h1>
        </div>

        <button
          onClick={() => setComposerOpen(v => !v)}
          style={{
            background: '#FFFFFF',
            color: '#0E0E0E',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 11,
            fontWeight: 850,
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            flexShrink: 0,
          }}
        >
          <Plus size={15} />
          {t('Тикет', 'Ticket')}
        </button>
      </div>

      <div style={glass({ padding: '14px', display: 'flex', alignItems: 'center', gap: 12 })}>
        <div style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <MessageCircle size={19} color={ACCENT} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 12, color: TEXT, fontFamily: 'monospace', fontWeight: 800 }}>
            {t('Связаться с поддержкой', 'Contact support')}
          </p>
          <p style={{ fontSize: 11, color: TEXT2, marginTop: 2, fontFamily: 'monospace' }}>
            {SUPPORT_BOT}
          </p>
        </div>
        <button
          onClick={openTelegramSupport}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            padding: '9px 10px',
            color: TEXT,
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'monospace',
            flexShrink: 0,
          }}
        >
          Telegram
        </button>
      </div>

      {composerOpen && (
        <div style={glass({ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <Ticket size={16} color={ACCENT} />
            <p style={{ fontSize: 12, color: TEXT, fontFamily: 'monospace', fontWeight: 800 }}>
              {t('НОВОЕ ОБРАЩЕНИЕ', 'NEW TICKET')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
            {CATEGORIES.map(item => {
              const active = item === category
              return (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  style={{
                    background: active ? '#FFFFFF' : 'rgba(255,255,255,0.04)',
                    color: active ? '#0E0E0E' : TEXT2,
                    border: active ? 'none' : '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 8,
                    padding: '8px 10px',
                    fontSize: 10,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t('Опишите проблему: устройство, приложение, ошибка, когда началось...', 'Describe the issue: device, app, error, when it started...')}
            style={{
              width: '100%',
              minHeight: 118,
              resize: 'vertical',
              background: 'rgba(0,0,0,0.32)',
              border: `1px solid ${LINE}`,
              borderRadius: 8,
              color: TEXT,
              outline: 'none',
              padding: 12,
              fontSize: 12,
              lineHeight: 1.5,
              fontFamily: 'monospace',
            }}
          />

          <button
            onClick={createTicket}
            disabled={!message.trim()}
            style={{
              width: '100%',
              background: message.trim() ? '#FFFFFF' : 'rgba(255,255,255,0.08)',
              color: message.trim() ? '#0E0E0E' : MUTED,
              borderRadius: 8,
              padding: '12px',
              fontSize: 12,
              fontWeight: 850,
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Send size={14} />
            {t('ОТПРАВИТЬ', 'SEND')}
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 12 }}>
        <div style={glass({ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 })}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: TEXT, fontFamily: 'monospace', fontWeight: 800 }}>
              {t('Ваши обращения', 'Your tickets')}
            </p>
            <span style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 20,
              padding: '3px 9px',
              color: TEXT2,
              fontSize: 10,
              fontFamily: 'monospace',
              fontWeight: 700,
            }}>
              {tickets.length}
            </span>
          </div>

          {tickets.length === 0 ? (
            <div style={{
              minHeight: 168,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              textAlign: 'center',
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Inbox size={22} color={TEXT2} />
              </div>
              <p style={{ fontSize: 13, color: TEXT2 }}>
                {t('Нет обращений', 'No tickets')}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tickets.map(ticket => (
                <div key={ticket.id} style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 8,
                  padding: '11px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}>
                  <LifeBuoy size={15} color={ACCENT} style={{ marginTop: 1, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, color: TEXT, fontFamily: 'monospace', fontWeight: 800 }}>
                      {ticket.id} · {ticket.category}
                    </p>
                    <p style={{ fontSize: 10.5, color: TEXT2, marginTop: 4, lineHeight: 1.4 }}>
                      {ticket.message}
                    </p>
                    <p style={{ fontSize: 9.5, color: MUTED, marginTop: 6, fontFamily: 'monospace' }}>
                      {ticket.createdAt} · {t('новый', 'new')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={glass({
          padding: 14,
          minHeight: 190,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          textAlign: 'center',
        })}>
          <div style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {sent ? <Check size={22} color={ACCENT} /> : <MessageCircle size={22} color={TEXT2} />}
          </div>
          <p style={{ fontSize: 13, color: TEXT2 }}>
            {sent ? t('Обращение создано', 'Ticket created') : t('Выберите обращение или создайте новое', 'Select a ticket or create a new one')}
          </p>
          <p style={{ fontSize: 10.5, color: MUTED, lineHeight: 1.45, maxWidth: 260 }}>
            {t('Пока это локальная заготовка. После backend тикеты будут уходить оператору и в Telegram.', 'This is a local draft. With backend, tickets will go to operators and Telegram.')}
          </p>
        </div>
      </div>
    </div>
  )
}
