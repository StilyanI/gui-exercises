import { useMemo, useState } from 'react'
import { create } from 'zustand'

const useTodoStore = create((set) => ({
  todos: [
    { id: 1, text: 'Научи useReducer', done: true },
    { id: 2, text: 'Научи Context API', done: true },
    { id: 3, text: 'Научи Zustand', done: false },
    { id: 4, text: 'Направи проект', done: false },
  ],
  filter: 'all',
  searchQuery: '',

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, done: false }],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  setFilter: (filter) => set({ filter }),
  setSearch: (searchQuery) => set({ searchQuery }),
}))

function SearchInput() {
  const searchQuery = useTodoStore((state) => state.searchQuery)
  const setSearch = useTodoStore((state) => state.setSearch)

  return (
    <input
      placeholder="Търси задача"
      value={searchQuery}
      onChange={(event) => setSearch(event.target.value)}
    />
  )
}

function FilterButtons() {
  const filter = useTodoStore((state) => state.filter)
  const setFilter = useTodoStore((state) => state.setFilter)

  return (
    <div className="button-row">
      {[
        ['all', 'Всички'],
        ['active', 'Активни'],
        ['completed', 'Завършени'],
      ].map(([value, label]) => (
        <button
          key={value}
          className={filter === value ? 'active-filter' : ''}
          onClick={() => setFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const deleteTodo = useTodoStore((state) => state.deleteTodo)

  return (
    <div className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className={todo.done ? 'todo-done' : ''}>{todo.text}</span>
      </label>
      <button onClick={() => deleteTodo(todo.id)}>Изтрий</button>
    </div>
  )
}

function TodoList() {
  const todos = useTodoStore((state) => state.todos)
  const filter = useTodoStore((state) => state.filter)
  const searchQuery = useTodoStore((state) => state.searchQuery)

  const filteredTodos = useMemo(() => {
    let result = todos

    if (filter === 'active') result = result.filter((todo) => !todo.done)
    if (filter === 'completed') result = result.filter((todo) => todo.done)

    if (searchQuery) {
      result = result.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return result
  }, [todos, filter, searchQuery])

  if (!filteredTodos.length) {
    return <p className="empty-state">Няма намерени задачи.</p>
  }

  return (
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

function Stats() {
  const todos = useTodoStore((state) => state.todos)
  const stats = useMemo(
    () => ({
      total: todos.length,
      done: todos.filter((todo) => todo.done).length,
      remaining: todos.filter((todo) => !todo.done).length,
    }),
    [todos]
  )
  const progress = stats.total ? Math.round((stats.done / stats.total) * 100) : 0

  return (
    <div className="summary-card">
      <p>
        {stats.done} от {stats.total} завършени ({progress}%)
      </p>
      <p>Остават: {stats.remaining}</p>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

function AddTodoForm() {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const submit = () => {
    const trimmedText = text.trim()
    if (!trimmedText) return
    addTodo(trimmedText)
    setText('')
  }

  return (
    <div className="inline-form">
      <input
        placeholder="Нова задача"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') submit()
        }}
      />
      <button onClick={submit}>Добави</button>
    </div>
  )
}

export function TodoZustand() {
  return (
    <div className="demo-stack">
      <AddTodoForm />
      <SearchInput />
      <FilterButtons />
      <TodoList />
      <Stats />
    </div>
  )
}
