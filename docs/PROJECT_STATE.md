# Utopia VPN — Project State

> Последнее обновление: 2025-07-05
> Стек: React + Vite + TypeScript + Tailwind + Telegram Mini App

---

## 📁 Структура проекта

```
C:\Users\maksi\OneDrive\Desktop\Utopia2\
├── src/
│   ├── components/
│   │   ├── InstallScreen.tsx    — Экран установки (платформы, клиенты, шаги)
│   │   ├── Layout.tsx           — Главный layout (header, bottom nav, drawer)
│   │   ├── ParticleBackground.tsx — Фоновая анимация
│   │   └── ...
│   ├── context/
│   │   ├── SubContext.tsx       — Контекст подписки (localStorage)
│   │   └── LangContext.tsx      — Контекст языка (ru/en)
│   ├── i18n/
│   │   └── translations.ts      — Переводы
│   └── App.tsx                  — Роутинг
├── docs/
│   └── PROJECT_STATE.md         — Этот файл
└── package.json
```

---

## ✅ Что сделано

### Фронтенд
- **Layout** — header с логотипом, bottom nav (Home/Sub/Balance), drawer меню с аватаром юзера
- **InstallScreen** — выбор платформы (Windows/macOS/iOS/Android), выбор клиента (Happ, v2rayNG, Streisand...), 3 шага установки
- **ParticleBackground** — анимированный фон с частицами
- **LangContext** — переключение ru/en, сохранение в localStorage
- **SubContext** — активация подписки, хранение в localStorage, расчёт дней до окончания
- **Роутинг** — React Router с protected routes

### Telegram Integration
- Получение initDataUnsafe.user (имя, ник)
- Telegram WebApp BackButton
- Deep link scheme (`happ://`) для импорта подписки

### Дизайн
- Моноширинная эстетика (JetBrains Mono)
- Чёрный фон (#0E0E0E), белый текст
- Glassmorphism карточки
- Bottom nav с active states
- Drawer меню с анимацией

---

## 🔴 Критические проблемы (безопасность)

### 1. Подписка хранится ТОЛЬКО в localStorage
```tsx
// SubContext.tsx — activate() просто пишет дату в localStorage
localStorage.setItem(STORAGE_KEY, JSON.stringify({
  active: true, plan: '12m', devices: 999, ...
}))
```
**Проблема:** Любой юзер может открыть DevTools и наставить себе что угодно.
**Решение:** Нужен бэкенд с валидацией подписки (JWT/secret token).

### 2. Нет серверной валидации
- Нет проверки device fingerprint
- Нет проверки подписки на каждом экшене
- Нет rate limiting

### 3. Hardcoded MOCK_SUB_URL
- Ссылка на подписку захардкожена, должна coming from backend

---

## 🟡 Средние проблемы (UX/код)

1. **`BLUE = '#FFFFFF'`** — переменная называется BLUE но это белый цвет. Вводит в заблуждение
2. **Нет loading states** — если данные грузятся долго, пользователь видит пустой экран
3. **Нет error boundaries** — один баг = белый экран
4. **Нет offline fallback** — при потере связи приложение мертво
5. **sanitize() базовый** — только `<>'"` ,不够 comprehensive для XSS

---

## 🟢 Сильные стороны

- Чистый, читаемый код
- Правильная компонентная архитектура
- Platform-aware install flow — отличная фича
- Стильный минималистичный дизайн
- Правильная i18n структура
- Telegram WebApp интеграция

---

## 📋 Что нужно сделать (по шагам)

### Этап 1: Безопасность (критично)
1. [ ] Создать бэкенд API для валидации подписок
2. [ ] JWT token вместо localStorage-only
3. [ ] Device fingerprinting
4. [ ] Server-side validation на каждый запрос

### Этап 2: UX улучшения
1. [ ] Добавить loading states на все экраны
2. [ ] Добавить error boundaries
3. [ ] Добавить error/failure states
4. [ ] Исправить `BLUE` → `WHITE` (переименовать переменную)
5. [ ] Добавить dynamic subscription URL

### Этап 3: Новые экраны
1. [ ] Экран статуса подписки (дни, устройства, регион)
2. [ ] Экран настроек (смена региона, смена клиента)
3. [ ] Экран поддержки/тикетов
4. [ ] Экран баланса/рефералов

### Этап 4: Полировка
1. [ ] Offline fallback
2. [ ] Оптимизация ParticleBackground
3. [ ] Анимации переходов между экранами
4. [ ] PWA support

---

## 🎯 Архитектурные решения

### Почему localStorage для подписки?
- Простота, нет зависимостей
- Работает без бэкенда (dev mode)
- **НО** не подходит для production — легко подделать

### Почему Happ как рекомендованный клиент?
- Поддерживает deep link scheme (`happ://`)
- Автоматический импорт подписки
- Кроссплатформенный (iOS + Android)

### Почему monospace шрифт?
- Техническая эстетика, соответствует VPN/tech branding
- Отличается от конкурентов

---

## 🧠 Контекст для нового чата

**Ключевые файлы для чтения при продолжении:**
1. `src/components/InstallScreen.tsx` — основной экран установки
2. `src/components/Layout.tsx` — главный layout
3. `src/context/SubContext.tsx` — контекст подписки (проблема безопасности)
4. `src/context/LangContext.tsx` — контекст языка
5. `src/i18n/translations.ts` — переводы

**Приоритет задач:** Безопасность → UX → Новые экраны → Полировка

**Стиль кода:** Моноширинный, минималистичный, glassmorphism, чёрный фон
