import { createContext, useContext, useMemo, useReducer, useState } from 'react'
import { create } from 'zustand'
import { CartItem } from './CartItem.jsx'

const EcommerceThemeContext = createContext(null)
const EcommerceAuthContext = createContext(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () =>
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))

  return (
    <EcommerceThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </EcommerceThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(EcommerceThemeContext)
  if (!context) {
    throw new Error('useTheme трябва да е в ThemeProvider!')
  }
  return context
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (email) =>
    setUser({ email, name: email.split('@')[0] || 'shopper' })
  const logout = () => setUser(null)

  return (
    <EcommerceAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </EcommerceAuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(EcommerceAuthContext)
  if (!context) {
    throw new Error('useAuth трябва да е в AuthProvider!')
  }
  return context
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      )

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        items: state.items.filter((item) => item.product.id !== action.id),
      }
    case 'UPDATE_QUANTITY':
      return {
        items: state.items
          .map((item) =>
            item.product.id === action.id
              ? { ...item, quantity: Math.max(1, action.quantity) }
              : item
          )
          .filter((item) => item.quantity > 0),
      }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

const useProductStore = create((set) => ({
  products: [
    { id: 1, name: 'React книга', price: 45, category: 'books' },
    { id: 2, name: 'JS тениска', price: 30, category: 'clothing' },
    { id: 3, name: 'CSS стикери', price: 5, category: 'accessories' },
    { id: 4, name: 'Node.js чаша', price: 15, category: 'accessories' },
    { id: 5, name: 'TypeScript курс', price: 99, category: 'courses' },
  ],
  favorites: [],
  searchQuery: '',
  category: 'all',

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((favoriteId) => favoriteId !== id)
        : [...state.favorites, id],
    })),

  setSearch: (searchQuery) => set({ searchQuery }),
  setCategory: (category) => set({ category }),
}))

function NavBar({ cartItemCount }) {
  const { theme, toggleTheme } = useTheme()
  const { user, login, logout } = useAuth()
  const [email, setEmail] = useState('john.doe@example.com')

  return (
    <header className={`shop-navbar shop-${theme}`}>
      <div>
        <h3>Mini Shop</h3>
        <p>{user ? `Влезнал: ${user.name}` : 'Няма активен потребител'}</p>
      </div>
      <div className="button-row">
        {user ? (
          <>
            <span className="pill-badge">{user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <div className="inline-form navbar-auth">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button onClick={() => login(email)}>Login</button>
          </div>
        )}
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <span className="pill-badge">Количка: {cartItemCount}</span>
      </div>
    </header>
  )
}

function SearchBar() {
  const searchQuery = useProductStore((state) => state.searchQuery)
  const setSearch = useProductStore((state) => state.setSearch)

  return (
    <input
      placeholder="Търси продукт"
      value={searchQuery}
      onChange={(event) => setSearch(event.target.value)}
    />
  )
}

function CategoryFilter() {
  const category = useProductStore((state) => state.category)
  const setCategory = useProductStore((state) => state.setCategory)

  return (
    <div className="button-row">
      {['all', 'books', 'clothing', 'accessories', 'courses'].map((value) => (
        <button
          key={value}
          className={category === value ? 'active-filter' : ''}
          onClick={() => setCategory(value)}
        >
          {value}
        </button>
      ))}
    </div>
  )
}

function ProductCard({ product, onAddToCart }) {
  const toggleFavorite = useProductStore((state) => state.toggleFavorite)
  const favorites = useProductStore((state) => state.favorites)
  const isFavorite = favorites.includes(product.id)

  return (
    <article className="shop-card">
      <h4>{product.name}</h4>
      <p>{product.price.toFixed(2)} лв.</p>
      <span>{product.category}</span>
      <div className="button-row">
        <button onClick={() => onAddToCart(product)}>Добави в количка</button>
        <button onClick={() => toggleFavorite(product.id)}>
          {isFavorite ? 'Премахни любим' : 'Любим'}
        </button>
      </div>
    </article>
  )
}

function ProductGrid({ onAddToCart }) {
  const products = useProductStore((state) => state.products)
  const searchQuery = useProductStore((state) => state.searchQuery)
  const category = useProductStore((state) => state.category)

  const filteredProducts = useMemo(() => {
    let result = products

    if (category !== 'all') {
      result = result.filter((product) => product.category === category)
    }

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return result
  }, [products, searchQuery, category])

  return (
    <div className="card-grid">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

function Cart({ items, dispatch }) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="summary-card">
      <h4>Количка</h4>
      {items.length ? (
        <div className="cart-list">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              title={item.product.name}
              subtitle={`${item.quantity} x ${item.product.price.toFixed(2)} лв.`}
              quantity={item.quantity}
              onDecrease={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  id: item.product.id,
                  quantity: item.quantity - 1,
                })
              }
              onIncrease={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  id: item.product.id,
                  quantity: item.quantity + 1,
                })
              }
              onRemove={() =>
                dispatch({ type: 'REMOVE_FROM_CART', id: item.product.id })
              }
              removeLabel="X"
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">Количката е празна.</p>
      )}
      <p>Общо: {total.toFixed(2)} лв.</p>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear cart
      </button>
    </div>
  )
}

function FavoritesPanel() {
  const products = useProductStore((state) => state.products)
  const favorites = useProductStore((state) => state.favorites)
  const favoriteProducts = useMemo(
    () => products.filter((product) => favorites.includes(product.id)),
    [products, favorites]
  )

  return (
    <div className="summary-card">
      <h4>Favorites</h4>
      {favoriteProducts.length ? (
        favoriteProducts.map((product) => <p key={product.id}>{product.name}</p>)
      ) : (
        <p className="empty-state">Все още няма любими продукти.</p>
      )}
    </div>
  )
}

function MiniEcommerceInner() {
  const [cart, cartDispatch] = useReducer(cartReducer, { items: [] })
  const { theme } = useTheme()

  return (
    <div className={`demo-stack ecommerce-shell ecommerce-${theme}`}>
      <NavBar cartItemCount={cart.items.length} />
      <div className="shop-layout">
        <div className="demo-stack">
          <SearchBar />
          <CategoryFilter />
          <ProductGrid
            onAddToCart={(product) =>
              cartDispatch({ type: 'ADD_TO_CART', product })
            }
          />
        </div>
        <div className="demo-stack">
          <Cart items={cart.items} dispatch={cartDispatch} />
          <FavoritesPanel />
        </div>
      </div>
    </div>
  )
}

export function MiniEcommerce() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MiniEcommerceInner />
      </AuthProvider>
    </ThemeProvider>
  )
}
