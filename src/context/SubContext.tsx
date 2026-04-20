import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Plan = '1m' | '3m' | '6m' | '12m'

interface Location {
  countryCode: string
  name: string
  flag: string
}

interface SubState {
  active: boolean
  plan: Plan | null
  devices: number
  expiresAt: Date | null
  daysLeft: number
  location: Location | null
}

interface SubContextValue extends SubState {
  activate: (plan: Plan, devices: number, location: Location) => void
  deactivate: () => void
}

const PLAN_MONTHS: Record<Plan, number> = { '1m': 1, '3m': 3, '6m': 6, '12m': 12 }
const STORAGE_KEY = 'utopia.sub.v1'

const INITIAL: SubState = { active: false, plan: null, devices: 1, expiresAt: null, daysLeft: 0, location: null }

function loadState(): SubState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL
    const parsed = JSON.parse(raw) as Omit<SubState, 'expiresAt' | 'daysLeft'> & { expiresAt: string | null }
    const expiresAt = parsed.expiresAt ? new Date(parsed.expiresAt) : null
    if (!expiresAt || expiresAt.getTime() <= Date.now()) return INITIAL
    const daysLeft = Math.ceil((expiresAt.getTime() - Date.now()) / 86_400_000)
    return { active: parsed.active, plan: parsed.plan, devices: parsed.devices, expiresAt, daysLeft, location: parsed.location || null }
  } catch {
    return INITIAL
  }
}

const SubContext = createContext<SubContextValue | null>(null)

export function SubProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubState>(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        active: state.active, plan: state.plan, devices: state.devices,
        expiresAt: state.expiresAt ? state.expiresAt.toISOString() : null,
        location: state.location,
      }))
    } catch { /* quota/private mode */ }
  }, [state])

  function activate(plan: Plan, devices: number, location: Location) {
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + PLAN_MONTHS[plan])
    const daysLeft = Math.ceil((expiresAt.getTime() - Date.now()) / 86_400_000)
    setState({ active: true, plan, devices, expiresAt, daysLeft, location })
  }

  function deactivate() {
    setState(INITIAL)
  }

  return (
    <SubContext.Provider value={{ ...state, activate, deactivate }}>
      {children}
    </SubContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSub() {
  const ctx = useContext(SubContext)
  if (!ctx) throw new Error('useSub must be used inside SubProvider')
  return ctx
}
