import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, Bell, Menu, X, Sparkles, CreditCard, Users, MessageCircle, Info, User, LogOut, ArrowLeft } from 'lucide-react'
import { useState, useMemo } from 'react'
import ParticleBackground from './ParticleBackground'
import { useLang } from '../i18n/LangContext'

const BLUE  = '#FFFFFF'
const WHITE = '#FFFFFF'
const MUTED = '#808080'
const BG    = '#0E0E0E'

const MENU_ICONS = [Home, Sparkles, CreditCard, Users, MessageCircle, Info, User] as const
const MENU_LABELS_RU = ['Главная', 'Подписка', 'Баланс', 'Рефералы', 'Поддержка', 'Информация', 'Профиль'] as const
const MENU_LABELS_EN = ['Home', 'Plans', 'Balance', 'Referrals', 'Support', 'Info', 'Profile'] as const

export default function Layout() {
  const { lang, toggle, tr } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const canGoBack = location.pathname !== '/'

  const tgUser     = (window as any).Telegram?.WebApp?.initDataUnsafe?.user
  const userName   = tgUser?.first_name || 'Максим'
  const userNick   = tgUser?.username ? `@${tgUser.username}` : '@utopia_user'
  const userInitial = userName[0]?.toUpperCase() || 'M'

  const menuItems = useMemo(() => {
    const labels = lang === 'ru' ? MENU_LABELS_RU : MENU_LABELS_EN
    return MENU_ICONS.map((icon, i) => ({ icon, label: labels[i], active: i === 0 }))
  }, [lang])

  const nav = useMemo(() => [
    { to: '/',    icon: Home,     label: tr('nav_home') },
    { to: '/sub', icon: Sparkles, label: tr('nav_sub')  },
  ], [tr])

  return (
    <div style={{
      background: BG,
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>

      <ParticleBackground />

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: '#0E0E0E',
        borderBottom: '1px solid #2A2A2A',
      }}>

        {/* Back button (на всех страницах кроме главной) */}
        {canGoBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            style={{
              background: 'transparent',
              border: '1px solid #2A2A2A',
              borderRadius: 8, padding: 6, marginRight: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowLeft size={16} color="#FFFFFF" />
          </button>
        )}

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* small orbit icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="3" fill="#FFFFFF"/>
            <circle cx="9" cy="9" r="7" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 16, color: WHITE, letterSpacing: 0.5 }}>
            Utopia <span style={{ color: BLUE }}>VPN</span>
          </span>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={{ background: 'none', padding: 6, display: 'flex' }}>
            <Bell size={18} color={MUTED} />
          </button>

          <button
            onClick={toggle}
            style={{
              background: 'transparent',
              border: '1px solid #2A2A2A',
              borderRadius: 6, padding: '5px 9px',
              cursor: 'pointer',
            }}
          >
            <span style={{ color: WHITE, fontSize: 11, fontWeight: 500, letterSpacing: 0.5 }}>
              {lang === 'ru' ? 'RU' : 'EN'}
            </span>
          </button>

          <button onClick={() => setMenuOpen(true)} style={{ background: 'none', padding: 6, display: 'flex' }}>
            <Menu size={18} color={MUTED} />
          </button>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: 88, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>

      {/* ── BOTTOM NAV ── */}
      <nav style={{
        position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 100,
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        borderRadius: 12,
        display: 'flex',
        padding: '8px',
        gap: 8,
      }}>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {({ isActive }) => (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '10px 12px 8px', gap: 5,
                color: isActive ? '#FFFFFF' : '#808080',
                borderRadius: 10,
                border: isActive ? '1px solid #FFFFFF' : '1px solid transparent',
                background: isActive ? '#2A2A2A' : 'transparent',
                transition: 'all 0.2s ease',
              }}>
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.6} />
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 700 : 500,
                  letterSpacing: isActive ? 0.8 : 0.3,
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                }}>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={{
        position: 'fixed', bottom: 66, left: 0, right: 0, zIndex: 50,
        textAlign: 'center', fontSize: 10, color: 'rgba(0,255,65,0.18)',
        pointerEvents: 'none', letterSpacing: 1, fontFamily: 'monospace',
      }}>
        @utopia_vpn_bot
      </div>

      {/* ── DRAWER OVERLAY ── */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,8,0.75)',
          backdropFilter: 'blur(6px)',
        }}/>
      )}

      {/* ── DRAWER ── */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: '80%', maxWidth: 300,
        background: '#0E0E0E',
        borderLeft: '1px solid #2A2A2A',
        display: 'flex', flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Drawer header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 18px',
          borderBottom: '1px solid #2A2A2A',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: '#2A2A2A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0,
              border: '1px solid #3A3A3A',
            }}>
              {userInitial}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: WHITE, fontFamily: 'monospace' }}>{userName}</p>
              <p style={{ fontSize: 11, color: BLUE, marginTop: 2, fontFamily: 'monospace' }}>{userNick}</p>
            </div>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{
            background: 'transparent',
            border: '1px solid #2A2A2A',
            borderRadius: 8, padding: 8, display: 'flex',
          }}>
            <X size={15} color="#FFFFFF" />
          </button>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {menuItems.map(({ icon: Icon, label }, i) => {
            const to = i === 0 ? '/' : i === 1 ? '/sub' : null

            if (to) {
              return (
                <NavLink
                  key={label}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 20px',
                    background: 'none',
                    borderLeft: '2px solid transparent',
                    color: MUTED,
                    fontSize: 14, fontWeight: 400,
                    animation: menuOpen ? `fade-up 0.3s ease both` : 'none',
                    animationDelay: `${i * 40}ms`,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF'
                    e.currentTarget.style.borderLeft = `2px solid #FFFFFF`
                    e.currentTarget.style.background = '#1A1A1A'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#808080'
                    e.currentTarget.style.borderLeft = '2px solid transparent'
                    e.currentTarget.style.background = 'none'
                  }}
                >
                  <Icon size={18} color={MUTED} />
                  <span style={{ fontFamily: 'monospace', letterSpacing: 0.5 }}>{label}</span>
                </NavLink>
              )
            }

            return (
              <button
                key={label}
                onClick={() => setMenuOpen(false)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 20px',
                  background: 'none',
                  borderLeft: '2px solid transparent',
                  color: MUTED,
                  fontSize: 14, fontWeight: 400,
                  animation: menuOpen ? `fade-up 0.3s ease both` : 'none',
                  animationDelay: `${i * 40}ms`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.borderLeft = `2px solid #FFFFFF`
                  e.currentTarget.style.background = '#1A1A1A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#808080'
                  e.currentTarget.style.borderLeft = '2px solid transparent'
                  e.currentTarget.style.background = 'none'
                }}
              >
                <Icon size={18} color={MUTED} />
                <span style={{ fontFamily: 'monospace', letterSpacing: 0.5 }}>{label}</span>
              </button>
            )
          })}
        </div>

        {/* Logout */}
        <div style={{ borderTop: '1px solid #2A2A2A', padding: '8px 0 24px' }}>
          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 20px', color: '#E05555', fontSize: 14, fontWeight: 500,
          }}>
            <LogOut size={18} color="#E05555" />
            {lang === 'ru' ? 'Выйти' : 'Log out'}
          </button>
        </div>
      </div>
    </div>
  )
}
