import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () =>
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme трябва да е в ThemeProvider!')
  }

  return context
}

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`theme-block theme-${theme} theme-header`}>
      <div>
        <h3>Тема: {theme === 'dark' ? 'Тъмна' : 'Светла'}</h3>
      </div>
      <button onClick={toggleTheme}>Смени тема</button>
    </header>
  )
}

function QuizCard({ title, questions }) {
  const { theme } = useTheme()

  return (
    <article className={`theme-block theme-${theme} quiz-card`}>
      <h4>{title}</h4>
      <p>{questions} въпроса</p>
    </article>
  )
}

function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`theme-block theme-${theme} theme-footer`}>
      <p>Footer.</p>
    </footer>
  )
}

export function ThemeToggleShowcase() {
  return (
    <ThemeProvider>
      <div className="demo-stack">
        <Header />
        <div className="card-grid compact-grid">
          <QuizCard title="HTML" questions={32} />
          <QuizCard title="CSS" questions={32} />
          <QuizCard title="JavaScript" questions={24} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
