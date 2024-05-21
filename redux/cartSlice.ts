'use client'; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '@/lib/book';

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const book = action.payload;
      const existingItem = state.items.find(item => item.book.id === book.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ book, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<Book>) => {
      state.items = state.items.filter(item => item.book.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
