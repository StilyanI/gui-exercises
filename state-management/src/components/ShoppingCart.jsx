import { useReducer } from 'react'
import { CartItem } from './CartItem.jsx'

const PRODUCTS = [
  { id: 1, name: 'React тениска', price: 29.99, emoji: 'T' },
  { id: 2, name: 'JavaScript чаша', price: 14.99, emoji: 'C' },
  { id: 3, name: 'CSS стикери', price: 4.99, emoji: 'S' },
  { id: 4, name: 'Node.js шапка', price: 24.99, emoji: 'H' },
]

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
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
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.product.id !== action.id),
      }
    case 'UPDATE_QUANTITY':
      return {
        items: state.items
          .map((item) =>
            item.product.id === action.id
              ? { ...item, quantity: Math.max(0, action.quantity) }
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

function ProductCatalog({ onAdd }) {
  return (
    <div className="card-grid">
      {PRODUCTS.map((product) => (
        <article key={product.id} className="shop-card">
          <div className="product-icon">{product.emoji}</div>
          <h4>{product.name}</h4>
          <p>{product.price.toFixed(2)} лв.</p>
          <button onClick={() => onAdd(product)}>Добави</button>
        </article>
      ))}
    </div>
  )
}

function CartSummary({ totalItems, total, onClear }) {
  return (
    <div className="summary-card">
      <h4>Обобщение</h4>
      <p>Общо артикули: {totalItems}</p>
      <p>Обща цена: {total.toFixed(2)} лв.</p>
      <button onClick={onClear} disabled={!totalItems}>
        Изчисти
      </button>
    </div>
  )
}

export function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="demo-stack">
      <ProductCatalog
        onAdd={(product) => dispatch({ type: 'ADD_ITEM', product })}
      />

      <div className="summary-card">
        <h3>Количка ({totalItems} артикула)</h3>
        {cart.items.length ? (
          <div className="cart-list">
            {cart.items.map((item) => (
              <CartItem
                key={item.product.id}
                title={item.product.name}
                subtitle={`${item.product.price.toFixed(2)} лв. / бр.`}
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
                  dispatch({
                    type: 'REMOVE_ITEM',
                    id: item.product.id,
                  })
                }
                removeLabel="Премахни"
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">Количката е празна.</p>
        )}
      </div>

      <CartSummary
        totalItems={totalItems}
        total={totalPrice}
        onClear={() => dispatch({ type: 'CLEAR_CART' })}
      />
    </div>
  )
}
