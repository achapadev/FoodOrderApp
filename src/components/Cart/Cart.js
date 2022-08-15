// should render all the cart items and display total amount
// also give us buttons for leaving the cart
import classes from './Cart.module.css'
import { useContext } from 'react'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  const cartItemAddHandler = (item) => {
    // functionality for our + button within the Cart (shown on Moda)
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  )
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
