export function CartItem({
  title,
  subtitle,
  quantity,
  onDecrease,
  onIncrease,
  onRemove,
  removeLabel = 'Remove',
}) {
  return (
    <div className="cart-row">
      <div className="cart-item-copy">
        <strong>{title}</strong>
        <p>{subtitle}</p>
      </div>

      <div className="quantity-controls">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>

      <button onClick={onRemove}>{removeLabel}</button>
    </div>
  )
}
