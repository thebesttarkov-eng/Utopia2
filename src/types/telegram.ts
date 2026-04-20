export interface TelegramUser {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export interface TelegramBackButton {
  show: () => void
  hide: () => void
  onClick: (cb: () => void) => void
  offClick: (cb: () => void) => void
}

export interface TelegramWebApp {
  platform?: string
  initData?: string
  initDataUnsafe?: { user?: TelegramUser }
  BackButton?: TelegramBackButton
  ready?: () => void
  expand?: () => void
  close?: () => void
  colorScheme?: 'light' | 'dark'
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp }
  }
}

export function getTelegramWebApp(): TelegramWebApp | undefined {
  return typeof window === 'undefined' ? undefined : window.Telegram?.WebApp
}

export function getTelegramUser(): TelegramUser | undefined {
  return getTelegramWebApp()?.initDataUnsafe?.user
}
