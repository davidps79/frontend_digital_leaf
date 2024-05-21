'use client'; 
import React, { useEffect, useState } from 'react';
import BookList from '../BookList';
import Cart from '../Cart';
import { Book } from '@/lib/book';
import { getBooks } from '../API/api';

const ShoppingCartPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Book Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <BookList books={books} />
        </div>
        <div className="md:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
