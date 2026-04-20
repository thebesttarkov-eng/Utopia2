import { createContext, useContext, useState, type ReactNode } from 'react'
import { t, type Lang, type TKey } from './translations'

interface LangCtx {
  lang:      Lang
  toggle:    () => void
  tr:        (key: TKey) => string
}

const Ctx = createContext<LangCtx>(null!)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) ?? 'ru'
  })

  const toggle = () =>
    setLang(prev => {
      const next = prev === 'ru' ? 'en' : 'ru'
      localStorage.setItem('lang', next)
      return next
    })

  const tr = (key: TKey) => t[lang][key]

  return <Ctx.Provider value={{ lang, toggle, tr }}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(Ctx)
