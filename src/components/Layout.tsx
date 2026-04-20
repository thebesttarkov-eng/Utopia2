import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, Bell, Menu, X, Sparkles, CreditCard, Users, MessageCircle, Info, User, LogOut, ArrowLeft, RotateCcw, Wallet, Palette, PanelsTopLeft } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { useSub } from '../context/SubContext'
import { getTelegramUser } from '../types/telegram'

const ACCENT = '#FFFFFF'
const WHITE = '#FFFFFF'
const MUTED = '#808080'
const PANEL = 'rgba(14, 14, 14, 0.50)'
const SURFACE = '#1A1A1A'
const LINE = 'rgba(255,255,255,0.09)'

const MENU_ICONS = [Home, Sparkles, CreditCard, Users, MessageCircle, PanelsTopLeft, Palette, Info, User] as const
const MENU_LABELS_RU = ['Главная', 'Подписка', 'Баланс', 'Рефералы', 'Поддержка', 'Баннеры', 'Лого', 'Шрифты', 'Профиль'] as const
const MENU_LABELS_EN = ['Home', 'Plans', 'Balance', 'Referrals', 'Support', 'Banners', 'Logo', 'Fonts', 'Profile'] as const

export default function Layout() {
  const { lang, toggle, tr } = useLang()
  const { deactivate } = useSub()
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef<HTMLElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const canGoBack = location.pathname !== '/'

  const tgUser     = getTelegramUser()
  const sanitize = (str: string) => str.replace(/[<>'"]/g, '')
  const userName   = sanitize(tgUser?.first_name || 'Максим')
  const userNick   = tgUser?.username ? `@${sanitize(tgUser.username)}` : '@utopia_user'
  const userInitial = userName[0]?.toUpperCase() || 'M'

  const menuItems = useMemo(() => {
    const labels = lang === 'ru' ? MENU_LABELS_RU : MENU_LABELS_EN
    return MENU_ICONS.map((icon, i) => ({ icon, label: labels[i], active: i === 0 }))
  }, [lang])

  const nav = useMemo(() => [
    { to: '/',       icon: Home,     label: tr('nav_home') },
    { to: '/balance', icon: Wallet,  label: tr('nav_balance') },
    { to: '/sub',    icon: Sparkles, label: tr('nav_sub')  },
  ], [tr])

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div style={{
      background: '#0E0E0E',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        background: 'rgba(14, 14, 14, 0.50)',
        borderBottom: `1px solid ${LINE}`,
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.04)',
      }}>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {canGoBack && (
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${LINE}`,
                borderRadius: 8, padding: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ArrowLeft size={16} color="#FFFFFF" />
            </button>
          )}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={{
            background: 'rgba(255,255,255,0.035)',
            border: `1px solid ${LINE}`,
            borderRadius: 8,
            padding: 7,
            display: 'flex',
          }}>
            <Bell size={18} color={MUTED} />
          </button>

          <button
            onClick={toggle}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 8, padding: '6px 9px',
              cursor: 'pointer',
            }}
          >
            <span style={{ color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
              {lang === 'ru' ? 'RU' : 'EN'}
            </span>
          </button>

          <button onClick={() => setMenuOpen(true)} style={{
            background: 'rgba(255,255,255,0.035)',
            border: `1px solid ${LINE}`,
            borderRadius: 8,
            padding: 7,
            display: 'flex',
          }}>
            <Menu size={18} color={MUTED} />
          </button>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main ref={mainRef} style={{ flex: 1, overflowY: 'auto', paddingBottom: 88, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>

      {/* ── BOTTOM NAV ── */}
      <nav style={{
        position: 'fixed', bottom: 12, left: 12, right: 12, zIndex: 100,
        background: 'linear-gradient(180deg, rgba(24,24,24,0.58), rgba(12,12,12,0.82))',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 8,
        display: 'flex',
        padding: '5px',
        gap: 5,
        boxShadow: '0 8px 22px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)',
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
      }}>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {({ isActive }) => (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '7px 10px 6px', gap: 2,
                color: isActive ? ACCENT : MUTED,
                borderRadius: 8,
                border: isActive ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
                background: isActive
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))'
                  : 'transparent',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: '22%',
                    right: '22%',
                    height: 1,
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.82), rgba(97,153,255,0.75), rgba(255,255,255,0))',
                    boxShadow: '0 0 8px rgba(97,153,255,0.24)',
                  }} />
                )}
                <Icon size={17} strokeWidth={isActive ? 2.05 : 1.5} />
                <span style={{
                  fontSize: 9, fontWeight: isActive ? 700 : 500,
                  letterSpacing: 0,
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                }}>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={{
        position: 'fixed', bottom: 50, left: 0, right: 0, zIndex: 50,
        textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.18)',
        pointerEvents: 'none', letterSpacing: 1, fontFamily: 'monospace',
      }}>
        @UtopiaVPN_bot
      </div>

      {/* ── DRAWER OVERLAY ── */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.70)',
          backdropFilter: 'blur(8px)',
        }}/>
      )}

      {/* ── DRAWER ── */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: '80%', maxWidth: 300,
        background: PANEL,
        borderLeft: `1px solid ${LINE}`,
        display: 'flex', flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        boxShadow: '-18px 0 60px rgba(0,0,0,0.50), inset 1px 0 0 rgba(255,255,255,0.10)',
      }}>

        {/* Drawer header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 18px',
          borderBottom: `1px solid ${LINE}`,
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: '#2A2A2A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.16)',
            }}>
              {userInitial}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: WHITE, fontFamily: 'monospace' }}>{userName}</p>
              <p style={{ fontSize: 11, color: ACCENT, marginTop: 2, fontFamily: 'monospace' }}>{userNick}</p>
            </div>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${LINE}`,
            borderRadius: 8, padding: 8, display: 'flex',
          }}>
            <X size={15} color="#FFFFFF" />
          </button>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {menuItems.map(({ icon: Icon, label }, i) => {
            const to = i === 0 ? '/' : i === 1 ? '/sub' : i === 2 ? '/balance' : i === 4 ? '/support' : i === 5 ? '/banners' : i === 6 ? '/logo' : i === 7 ? '/fonts' : null

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
                    e.currentTarget.style.borderLeft = `2px solid ${ACCENT}`
                    e.currentTarget.style.background = SURFACE
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
                    e.currentTarget.style.borderLeft = `2px solid ${ACCENT}`
                    e.currentTarget.style.background = SURFACE
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
        <div style={{ borderTop: `1px solid ${LINE}`, padding: '8px 0 24px' }}>
          <button
            onClick={() => {
              deactivate()
              setMenuOpen(false)
            }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 20px', color: '#FCD34D', fontSize: 14, fontWeight: 500,
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            <RotateCcw size={18} color="#FCD34D" />
            {lang === 'ru' ? 'Сбросить подписку' : 'Reset subscription'}
          </button>
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
