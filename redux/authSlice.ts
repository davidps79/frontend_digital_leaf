import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios'; // Asegúrate de tener Axios importado
import { login, register, getUserById, updateUser, getAuthorProfile, getReaderProfile, addEbook, removeShoppingCart, updateShoppingCart, buyShoppingCart, getShoppingCart } from '../app/API/api';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Profile {
  favoriteGenre?: string;
  penName?: string;
  biography?: string;
  booksWritten?: { id: string; title: string }[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  cart: any[];
  
}

const initialState: AuthState = {
  token: null,
  user: null,
  profile: null,
  status: 'idle',
  cart: [],
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);
    return response.access_token;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: {
    username: string;
    password: string;
    email: string;
    role: string;
    favoriteGenre: string;
    penName: string;
    biography: string;
  }) => {
    const response = await register(userData);
    return response.access_token;
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.sub;
      const user = await getUserById(userId, token);
      let profile = null;

      if (user.role === 'Author') {
        profile = await getAuthorProfile(userId, token);
      } else if (user.role === 'Reader') {
        profile = await getReaderProfile(userId, token);
      }

      return { user, profile };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          return rejectWithValue('Unauthorized');
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ token, updateData }: { token: string; updateData: any }, { rejectWithValue }) => {
    try {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.sub;
      const updatedUser = await updateUser(userId, updateData, token);
      let updatedProfile = null;

      if (updatedUser.role === 'Author') {
        updatedProfile = await getAuthorProfile(userId, token);
      } else if (updatedUser.role === 'Reader') {
        updatedProfile = await getReaderProfile(userId, token);
      }

      return { user: updatedUser, profile: updatedProfile };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          return rejectWithValue('Unauthorized');
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
export const addNewEbook = createAsyncThunk(
  'auth/addNewEbook',
  async ({ token, ebookData }: { token: string; ebookData: any }, { rejectWithValue }) => {
    try {
      const response = await addEbook(ebookData, token);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchShoppingCart = createAsyncThunk(
  'cart/fetchShoppingCart',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    if (!token) return rejectWithValue('No token found');
    try {
      const response = await getShoppingCart();
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const buyCart = createAsyncThunk(
  'cart/buyCart',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    if (!token) return rejectWithValue('No token found');
    try {
      const response = await buyShoppingCart();
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
  async (updateShoppingCartDto, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    if (!token) return rejectWithValue('No token found');
    try {
      const response = await updateShoppingCart(updateShoppingCartDto);
      return response;
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
      const response = await removeShoppingCart();
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error.message);
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.profile = null;
      state.status = 'idle';
      state.error = null;
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.token = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register';
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<{ user: User; profile: Profile }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<{ user: User; profile: Profile }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user profile';
      })
      .addCase(addNewEbook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewEbook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addNewEbook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add new ebook';
      })
      .addCase(fetchShoppingCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShoppingCart.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(fetchShoppingCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch shopping cart';
      })
      .addCase(buyCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(buyCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = [];
        state.error = null;
      })
      .addCase(buyCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to buy shopping cart';
      })
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCart.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update shopping cart';
      })
      .addCase(removeCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCart.fulfilled, (state) => {
        state.status = 'succeeded';
        state.cart = [];
        state.error = null;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to remove shopping cart';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;