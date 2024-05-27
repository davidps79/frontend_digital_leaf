'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EbookCartItem } from '@/lib/book';
import { InfoEbookDto } from '@/lib/ebook';

interface CartItem {
  book: EbookCartItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;  
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<InfoEbookDto>) => {
      const book = new EbookCartItem(action.payload);
      const existingItem = state.items.find(item => item.book.id === book.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ book, quantity: 1 });
      }
      state.isCartOpen = true;  
    },
    removeFromCart: (state, action: PayloadAction<EbookCartItem>) => {
      state.items = state.items.filter(item => item.book.id !== action.payload.id);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;  
    },
    openCart: (state) => {
      state.isCartOpen = true;  
    },
    closeCart: (state) => {
      state.isCartOpen = false;  
    }
  },
});

export const { addToCart, removeFromCart, toggleCart, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
