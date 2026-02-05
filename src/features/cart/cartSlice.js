// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      console.log('Adding item to cart:', action.payload);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
     incrementQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decrementQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
    }
},
  },
});

export const { addItem, removeItem, clearCart,incrementQty, decrementQty  } = cartSlice.actions;
export default cartSlice.reducer;