import { createContext, useContext, useReducer } from 'react'

function notificationReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          type: action.notifType,
          message: action.message,
        },
      ]
    case 'REMOVE':
      return state.filter((notification) => notification.id !== action.id)
    case 'CLEAR_ALL':
      return []
    default:
      return state
  }
}

const NotificationContext = createContext(null)

function NotificationProvider({ children }) {
  const [notifications, dispatch] = useReducer(notificationReducer, [])

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE', id })
  }

  const addNotification = (type, message) => {
    const id = Date.now() + Math.random()
    dispatch({ type: 'ADD', id, notifType: type, message })
    globalThis.setTimeout(() => removeNotification(id), 5000)
  }

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' })
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

function useNotifications() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('Трябва NotificationProvider!')
  }

  return context
}

function NotificationCount() {
  const { notifications } = useNotifications()
  return <div className="pill-badge">Известия: {notifications.length}</div>
}

function AddNotificationPanel() {
  const { addNotification } = useNotifications()

  return (
    <div className="button-row">
      <button
        className="success-btn"
        onClick={() => addNotification('success', 'Операцията е успешна!')}
      >
        Успех
      </button>
      <button
        className="danger-btn"
        onClick={() => addNotification('error', 'Нещо се обърка!')}
      >
        Грешка
      </button>
      <button
        className="warning-btn"
        onClick={() => addNotification('warning', 'Внимавайте!')}
      >
        Внимание
      </button>
    </div>
  )
}

function NotificationList() {
  const { notifications, removeNotification } = useNotifications()

  if (!notifications.length) {
    return <p className="empty-state">Няма активни известия.</p>
  }

  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification-item ${notification.type}`}
        >
          <div>
            <strong>{notification.type}</strong>
            <p>{notification.message}</p>
          </div>
          <button onClick={() => removeNotification(notification.id)}>X</button>
        </div>
      ))}
    </div>
  )
}

function ClearAllButton() {
  const { notifications, clearAll } = useNotifications()

  return (
    <button onClick={clearAll} disabled={!notifications.length}>
      Изчисти всички
    </button>
  )
}

export function NotificationSystem() {
  return (
    <NotificationProvider>
      <div className="demo-stack">
        <NotificationCount />
        <AddNotificationPanel />
        <NotificationList />
        <ClearAllButton />
      </div>
    </NotificationProvider>
  )
}
