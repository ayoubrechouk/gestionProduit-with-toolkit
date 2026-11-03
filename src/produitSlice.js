import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  produits: [
    {
      ref: 'V001',
      intitule: 'Veste en jean vintage',
      prix: 420,
      categorie: 'Vestes',
      photo: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80',
    },
    {
      ref: 'V002',
      intitule: 'T-shirt graphique rétro',
      prix: 180,
      categorie: 'T-shirts',
      photo: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    },
    {
      ref: 'V003',
      intitule: 'Blouson en cuir vintage',
      prix: 690,
      categorie: 'Vestes',
      photo: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=400&q=80',
    },
    {
      ref: 'V004',
      intitule: 'Veste en denim rétro',
      prix: 490,
      categorie: 'Vestes',
      photo: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80',
    },
    {
      ref: 'V005',
      intitule: 'Chemise vintage',
      prix: 260,
      categorie: 'Chemises',
      photo: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&q=80',
    },
    {
      ref: 'V006',
      intitule: 'Robe rétro fleurie',
      prix: 380,
      categorie: 'Robes',
      photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    },
    {
      ref: 'V007',
      intitule: 'Pantalon vintage',
      prix: 320,
      categorie: 'Pantalons',
      photo: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80',
    },
    {
      ref: 'V008',
      intitule: 'Pull en maille rétro',
      prix: 350,
      categorie: 'Pulls',
      photo: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
    },
  ],
  searchTerm: '',
  filterCategory: '',
};

const produitSlice = createSlice({
  name: 'produits',
  initialState,
  reducers: {
    addProduit: (state, action) => {
      const produit = action.payload;
      const ref = String(produit?.ref ?? '').trim();

      if (
        !ref ||
        state.produits.some(
          (product) => product.ref.toLowerCase() === ref.toLowerCase(),
        )
      ) {
        return;
      }

      state.produits.push({ ...produit, ref });
    },
    updateProduit: (state, action) => {
      const ref = String(action.payload?.ref ?? '').trim();
      if (!ref) return;

      const index = state.produits.findIndex(
        (product) => product.ref.toLowerCase() === ref.toLowerCase(),
      );
      if (index !== -1) {
        state.produits[index] = { ...action.payload, ref };
      }
    },
    deleteProduit: (state, action) => {
      const ref = String(action.payload ?? '');
      state.produits = state.produits.filter((product) => product.ref !== ref);
      if (
        state.filterCategory &&
        !state.produits.some((product) => product.categorie === state.filterCategory)
      ) {
        state.filterCategory = '';
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = String(action.payload ?? '');
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = String(action.payload ?? '');
    }
  }
});

export const {
  addProduit,
  updateProduit,
  deleteProduit,
  setSearchTerm,
  setFilterCategory,
} = produitSlice.actions;
export default produitSlice.reducer;