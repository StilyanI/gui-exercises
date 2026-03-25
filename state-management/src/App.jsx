import './App.css'
import { ReducerCounter } from './components/ReducerCounter.jsx'
import { ThemeToggleShowcase } from './components/ThemeToggleShowcase.jsx'
import { NotificationSystem } from './components/NotificationSystem.jsx'
import { ShoppingCart } from './components/ShoppingCart.jsx'
import { MultiContextDashboard } from './components/MultiContextDashboard.jsx'
import { TodoZustand } from './components/TodoZustand.jsx'
import { MiniEcommerce } from './components/MiniEcommerce.jsx'

const exercises = [
  {
    id: '1',
    title: '1. Брояч с useReducer',
    component: <ReducerCounter />,
  },
  {
    id: '2',
    title: '2. Theme Toggle с Context API',
    component: <ThemeToggleShowcase />,
  },
  {
    id: '3',
    title: '3. Система за известия',
    component: <NotificationSystem />,
  },
  {
    id: '4',
    title: '4. Количка за пазаруване',
    component: <ShoppingCart />,
  },
  {
    id: '5',
    title: '5. Multi-Context Dashboard',
    component: <MultiContextDashboard />,
  },
  {
    id: '6',
    title: '6. Todo App със Zustand',
    component: <TodoZustand />,
  },
  {
    id: '7',
    title: '7. Мини e-commerce приложение',
    component: <MiniEcommerce />,
  },
]

function App() {
  return (
    <main className="app-shell">
      <div className="exercise-grid">
        {exercises.map((exercise) => (
          <section key={exercise.id} className="exercise-card">
            <div className="section-heading">
              <h2>{exercise.title}</h2>
            </div>
            <div className="demo-surface">{exercise.component}</div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default App
