// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = {
  cart: loadState() || { items: [] },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Suscribirse a cambios y guardar en localStorage
store.subscribe(() => {
  saveState(store.getState().cart);
});
