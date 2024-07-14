import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cart.js'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})


export default store;
