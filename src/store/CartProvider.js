// goal of this component is to manage the cart context data and provide that context to all components that want access to it

import { useReducer } from 'react'
// we choose to use useReducer over useState because this will be more complex state to manage
// we'll have to check whether a meal is alread apart of cart and for removing
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }
    // we use concat to return a new array instead of modifying existing state (immutable)
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems
    if (existingItem.amount === 1) {
      // remove item from new generated array because it is now less than 1
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      // don't remove item from array just update the amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
      updatedItems = [...state.items]
      // create new array with the old items
      updatedItems[existingCartItemIndex] = updatedItem
      // overwrite item with updated item that has updated amount
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }
  if (action.type === 'CLEAR') {
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = (props) => {
  // call useReducer and as 1st arg we point at reducer function .. will be executed by react for us
  // and we set intial state which is the defaultCartState

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = (item) => {
    // action can be anything but typically an object that has some property which allows you to identify that action inside reducer function
    // so that in that reducer function you can run diff code depending on which action type was dispatched
    dispatchCartAction({ type: 'ADD', item: item })
  }
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
