'use client';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EbookCartItem } from '@/lib/book';
import { InfoEbookDto } from '@/lib/ebook';
import { getShoppingCart, buyShoppingCart, updateShoppingCart, removeShoppingCart } from '@/app/API/api';

interface CartItem {
  book: EbookCartItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
  status: 'idle',
  error: null,
};

// Thunks
export const fetchShoppingCart = createAsyncThunk(
  'cart/fetchShoppingCart',
  async (token: string) => {
    const response = await getShoppingCart(token);
    return response;
  }
);

export const purchaseCart = createAsyncThunk(
  'cart/purchaseCart',
  async (token: string) => {
    const response = await buyShoppingCart(token);
    return response;
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ token, updateShoppingCartDto }: { token: string, updateShoppingCartDto: any }) => {
    const response = await updateShoppingCart(token, updateShoppingCartDto);
    return response;
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (token: string) => {
    await removeShoppingCart(token);
    return token;
  }
);

// Slice
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShoppingCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchShoppingCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch shopping cart';
      })
      .addCase(purchaseCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(purchaseCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(purchaseCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to purchase shopping cart';
      })
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update shopping cart';
      })
      .addCase(deleteCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [];
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete shopping cart';
      });
  },
});

export const { addToCart, removeFromCart, toggleCart, openCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
