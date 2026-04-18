import { lazy, Suspense, Component, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import { SubProvider } from './context/SubContext'
import Layout from './components/Layout'

const HomeScreen      = lazy(() => import('./screens/HomeScreen'))
const InstallScreen   = lazy(() => import('./screens/InstallScreen'))
const InstallGuideIOS = lazy(() => import('./screens/InstallGuideIOS'))
const EditorScreen    = lazy(() => import('./screens/EditorScreen'))
const SubScreen       = lazy(() => import('./screens/SubScreen'))

class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null }
  static getDerivedStateFromError(err: Error) { return { err } }
  render() {
    if (this.state.err) {
      return (
        <div style={{
          minHeight: '100vh', background: '#020D05', color: '#39D353',
          fontFamily: 'monospace', padding: 24, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <p style={{ fontSize: 16, fontWeight: 700 }}>// SYSTEM ERROR</p>
          <p style={{ fontSize: 12, opacity: 0.7 }}>{this.state.err.message}</p>
          <button
            onClick={() => location.reload()}
            style={{
              marginTop: 8, background: 'rgba(57,211,83,0.08)',
              border: '1px solid rgba(57,211,83,0.3)', color: '#39D353',
              borderRadius: 8, padding: '8px 16px', fontFamily: 'monospace',
            }}
          >RELOAD</button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <LangProvider>
        <SubProvider>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomeScreen />} />
                  <Route path="install" element={<InstallScreen />} />
                  <Route path="install/ios" element={<InstallGuideIOS />} />
                  <Route path="sub" element={<SubScreen />} />
                </Route>
                <Route path="/editor" element={<EditorScreen />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SubProvider>
      </LangProvider>
    </ErrorBoundary>
  )
}
