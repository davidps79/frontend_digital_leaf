import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import booksReducer from './booksSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
