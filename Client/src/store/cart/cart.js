
import { createSlice } from '@reduxjs/toolkit';
import toast from "react-hot-toast"

// Load cart from local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
};

const initialState = loadCartFromLocalStorage();


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      console.log("addItemToCart action triggered");
      const newItem = action.payload;
      console.log("New Item:", newItem);

      // Check if the item already exists in the cart
      const existingItem = state.items.find(item =>
        item.id === newItem.id && JSON.stringify(item.variations) === JSON.stringify(newItem.variations)
      );

      console.log("Existing Item:", existingItem);

      // Update total quantity and total amount
      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.price * newItem.quantity;

      if (!existingItem) {
        console.log("Adding new item to cart");
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
          currency: newItem.currency,
          img: newItem.mainImgSrc,
          name: newItem.name,
          variations: newItem.variations,
        });
      } else {
        console.log("Updating existing item in cart");
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.price * newItem.quantity;
      }
         // Save cart to local storage
         localStorage.setItem('cart', JSON.stringify(state));

       toast.success("Product Added to Cart")
      console.log('Updated cart:', JSON.parse(JSON.stringify(state.items))); // Log the updated state
    },
    removeItemFromCart(state, action) {
      const { id, variations } = action.payload;
      console.log("removeItemFromCart action triggered");

      // Find the item to remove
      const existingItem = state.items.find(item =>
        item.id === id && JSON.stringify(item.variations) === JSON.stringify(variations)
      );

      console.log("Existing Item:", existingItem);

      if (existingItem) {
        // Update total quantity and total amount
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;

        // Remove the item from the cart
        state.items = state.items.filter(item =>
          !(item.id === id && JSON.stringify(item.variations) === JSON.stringify(variations))
        );
        // Save cart to local storage
        localStorage.setItem('cart', JSON.stringify(state));
      }

      console.log('Updated cart:', JSON.parse(JSON.stringify(state.items))); // Log the updated state
      toast.success("Item removed from Cart")
    },
    updateItemQuantity(state, action) {
      const { id, variations, quantity } = action.payload;
      const existingItem = state.items.find(item =>
        item.id === id && JSON.stringify(item.variations) === JSON.stringify(variations)
      );
    
      if (existingItem) {
        // Ensure the quantity is at least 1
        if (quantity < 1) {
          return; // Prevent negative quantity
        }
    
        const previousQuantity = existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
    
        // Update total quantity and total amount
        state.totalQuantity += (quantity - previousQuantity);
        state.totalAmount += (existingItem.totalPrice - (previousQuantity * existingItem.price));
    
        // Save cart to local storage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    resetCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      localStorage.setItem('cart', JSON.stringify(state));
    }
    
    
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
