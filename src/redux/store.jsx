import {configureStore} from '@reduxjs/toolkit';
import produitReducer from '../produitSlice.js';

export const store = configureStore({
  reducer: {
    produits: produitReducer,
  },
});