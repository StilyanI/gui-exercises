import { useReducer, useState } from 'react'

const initialState = {
  count: 0,
  history: [],
}

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': {
      const nextCount = state.count + 1
      return {
        count: nextCount,
        history: [...state.history, '+1'],
      }
    }
    case 'DECREMENT': {
      const nextCount = state.count - 1
      return {
        count: nextCount,
        history: [...state.history, '-1'],
      }
    }
    case 'RESET':
      return {
        count: 0,
        history: [...state.history, 'Reset'],
      }
    case 'INCREMENT_BY': {
      const nextCount = state.count + action.payload
      return {
        count: nextCount,
        history: [...state.history, `+${action.payload}`],
      }
    }
    default:
      return state
  }
}

export function ReducerCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const [incrementAmount, setIncrementAmount] = useState(10)
  const historyClassName =
    state.history.length > 5 ? 'history-list scrollable-history' : 'history-list'

  return (
    <div className="demo-stack">
      <div className="stat-card">
        <span className="stat-label">Текуща стойност</span>
        <strong className="stat-value">{state.count}</strong>
      </div>

      <div className="button-row">
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>

      <div className="inline-form">
        <input
          type="number"
          value={incrementAmount}
          onChange={(event) => setIncrementAmount(Number(event.target.value))}
        />
        <button
          onClick={() =>
            dispatch({ type: 'INCREMENT_BY', payload: Number(incrementAmount) })
          }
        >
          Добави стойност
        </button>
      </div>

      <div>
        <h3>История на действията</h3>
        <div className={historyClassName}>
          {state.history.map((entry, index) => (
            <div key={`${entry}-${index}`} className="history-item">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
