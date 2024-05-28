import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EbookCartItem } from '@/lib/book';
import { InfoEbookDto } from '@/lib/ebook';
import { getShoppingCart, buyShoppingCart, updateShoppingCart, removeShoppingCart } from '@/app/API/api';

interface CartItem {
  book: InfoEbookDto;
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

export const fetchShoppingCart = createAsyncThunk(
  'cart/fetchShoppingCart',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    if (!token) return rejectWithValue('No token found');
    try {
      const response = await getShoppingCart(token);
      return response.ebooks; 
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const purchaseCart = createAsyncThunk(
  'cart/purchaseCart',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    if (!token) return rejectWithValue('No token found');
    try {
      const response = await buyShoppingCart(token);
      console.log(response)
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ ebookIds, operation }: { ebookIds: string[], operation: 'add' | 'remove' }, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    if (!token) return rejectWithValue('No token found');
    try {
      const updateDto = { ebookIds, operation };
      const response = await updateShoppingCart(updateDto, token);
      return response.ebooks;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const removeCart = createAsyncThunk(
  'cart/removeCart',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    if (!token) return rejectWithValue('No token found');
    try {
      const response = await removeShoppingCart(token);
      console.log(response)
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error.message);
    }
  }
);

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
        state.items.push({ book: action.payload, quantity: 1 });
      }
      state.isCartOpen = true;
    },
    removeFromCart: (state, action: PayloadAction<InfoEbookDto>) => {
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
      .addCase(fetchShoppingCart.fulfilled, (state, action: PayloadAction<InfoEbookDto[]>) => {
        state.status = 'succeeded';
        state.items = action.payload.map(book => ({ book, quantity: 1 }));
        state.error = null;
      })
      .addCase(fetchShoppingCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(purchaseCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(purchaseCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [];
        state.error = null;
      })
      .addCase(purchaseCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(removeCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [];
        state.error = null;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, removeFromCart, toggleCart, openCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
