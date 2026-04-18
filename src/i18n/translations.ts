export type Lang = 'ru' | 'en'

export const t = {
  ru: {
    // Layout
    nav_home:         'Главная',
    nav_sub:          'Подписка',
    nav_balance:      'Баланс',
    nav_referrals:    'Рефералы',
    nav_support:      'Поддержка',

    // Home
    welcome:          'Добро пожаловать, Максим!',
    your_sub:         'Ваша подписка',
    basic_user:       '★ Базовый юзер',
    badge_norm:       'НОРМА',
    badge_trial:      '+ ПРОБНЫЙ ПЕРИОД',
    traffic_title:    'Расход трафика',
    traffic_of:       'МБ / 1.0 ГБ',
    connect_device:   'Подключить устройство',
    devices_of:       '1 из 2 подключено',
    tariff_label:     'ТАРИФ',
    tariff_name:      'Текущий тариф',
    tariff_until:     'до 17.04.2025',
    days_label:       'ОСТАЛОСЬ',
    days_unit:        'дн.',
    refresh:          'Обновить',
    manage_sub:       'Управление подпиской →',
    balance:          'Баланс',
    referrals:        'Рефералы',
    slogan_top:       'СВОБОДА',
    slogan_bot:       'БЕЗ ГРАНИЦ',
    slogan_sub:       'Быстрый VPN по честной цене',
  },
  en: {
    // Layout
    nav_home:         'Home',
    nav_sub:          'Plans',
    nav_balance:      'Balance',
    nav_referrals:    'Referrals',
    nav_support:      'Support',

    // Home
    welcome:          'Welcome, Maxim!',
    your_sub:         'Your subscription',
    basic_user:       '★ Basic user',
    badge_norm:       'NORMAL',
    badge_trial:      '+ TRIAL PERIOD',
    traffic_title:    'Traffic usage',
    traffic_of:       'MB / 1.0 GB',
    connect_device:   'Connect device',
    devices_of:       '1 of 2 connected',
    tariff_label:     'PLAN',
    tariff_name:      'Current plan',
    tariff_until:     'until 17.04.2025',
    days_label:       'LEFT',
    days_unit:        'days',
    refresh:          'Refresh',
    manage_sub:       'Manage subscription →',
    balance:          'Balance',
    referrals:        'Referrals',
    slogan_top:       'FREEDOM',
    slogan_bot:       'NO LIMITS',
    slogan_sub:       'Fast VPN at a fair price',
  },
} as const satisfies Record<Lang, Record<string, string>>

export type TKey = keyof typeof t.ru
