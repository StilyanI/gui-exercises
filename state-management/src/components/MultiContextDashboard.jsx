import { createContext, useContext, useState } from 'react'

const DashboardThemeContext = createContext(null)
const DashboardAuthContext = createContext(null)
const LangContext = createContext(null)

const translations = {
  bg: {
    dashboard: 'Табло',
    quizzes: 'Тестове',
    settings: 'Настройки',
    welcome: 'Добре дошли',
    login: 'Вход',
    logout: 'Изход',
    subtitle: 'Моля влезте в профила си.',
    guest: 'Гост',
    namePlaceholder: 'Въведете име',
  },
  en: {
    dashboard: 'Dashboard',
    quizzes: 'Quizzes',
    settings: 'Settings',
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    subtitle: 'Please log into your profile.',
    guest: 'Guest',
    namePlaceholder: 'Enter your name',
  },
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () =>
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))

  return (
    <DashboardThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DashboardThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(DashboardThemeContext)
  if (!context) {
    throw new Error('useTheme трябва да е в ThemeProvider!')
  }
  return context
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (name) => setUser({ name, role: 'student' })
  const logout = () => setUser(null)

  return (
    <DashboardAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </DashboardAuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(DashboardAuthContext)
  if (!context) {
    throw new Error('useAuth трябва да е в AuthProvider!')
  }
  return context
}

function LangProvider({ children }) {
  const [lang, setLang] = useState('bg')
  const t = (key) => translations[lang][key] || key
  const toggleLang = () =>
    setLang((currentLang) => (currentLang === 'bg' ? 'en' : 'bg'))

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

function useLang() {
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang трябва да е в LangProvider!')
  }
  return context
}

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { user, login, logout } = useAuth()
  const { lang, t, toggleLang } = useLang()

  return (
    <header className={`dashboard-header dashboard-${theme}`}>
      <div>
        <h3>{t('dashboard')}</h3>
        <p>{user ? `${t('welcome')}, ${user.name === 'guest' ? t('guest') : user.name}` : t('subtitle')}</p>
      </div>
      <div className="button-row">
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <button onClick={toggleLang}>{lang === 'bg' ? 'EN' : 'BG'}</button>
        {user ? (
          <button onClick={logout}>{t('logout')}</button>
        ) : (
          <button onClick={() => login(lang === 'bg' ? 'Студент' : 'Student')}>
            {t('login')}
          </button>
        )}
      </div>
    </header>
  )
}

function Sidebar() {
  const { t } = useLang()
  const { theme } = useTheme()

  return (
    <aside className={`dashboard-sidebar dashboard-${theme}`}>
      <a href="#dashboard">{t('dashboard')}</a>
      <a href="#quizzes">{t('quizzes')}</a>
      <a href="#settings">{t('settings')}</a>
    </aside>
  )
}

function MainContent() {
  const { user, login } = useAuth()
  const { t } = useLang()
  const { theme } = useTheme()
  const [name, setName] = useState('')

  if (!user) {
    return (
      <div className={`dashboard-panel dashboard-${theme}`}>
        <h4>{t('login')}</h4>
        <div className="inline-form">
          <input
            placeholder={t('namePlaceholder')}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button onClick={() => login(name.trim() || 'guest')}>
            {t('login')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`dashboard-panel dashboard-${theme}`}>
      <h4>
        {t('welcome')}, {user.name === 'guest' ? t('guest') : user.name}!
      </h4>
      <div className="card-grid compact-grid">
        <div className={`mini-panel mini-panel-${theme}`}>
          <strong>12</strong>
          <span>{t('quizzes')}</span>
        </div>
        <div className={`mini-panel mini-panel-${theme}`}>
          <strong>4</strong>
          <span>{t('settings')}</span>
        </div>
      </div>
    </div>
  )
}

export function MultiContextDashboard() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LangProvider>
          <div className="demo-stack">
            <Header />
            <div className="dashboard-layout">
              <Sidebar />
              <MainContent />
            </div>
          </div>
        </LangProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
