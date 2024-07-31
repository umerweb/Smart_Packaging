import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.js';
import userReducer from './user/user.js';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
})


export default store;
