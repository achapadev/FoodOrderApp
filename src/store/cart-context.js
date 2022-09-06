import React from 'react'

// these default values are only used if the Provider is not used

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: (id) => {},
  clearCart: () => {},
})

export default CartContext
