import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks as fetchBooks } from '../app/API/api';

interface Author {
  name: string;
}

interface Book {
  id: string;
  title: string;
  publisher: string;
  author: Author;
  overview: string;
  price: number;
  stock: number;
  isbn: string;
  rating: number;
  category: string;
  ebookCover: string;
}

interface BooksState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  status: 'idle',
  error: null,
};

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  const response = await fetchBooks();
  return response;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default booksSlice.reducer;
