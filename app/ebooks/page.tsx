'use client'; 
import { useState, useEffect } from 'react';
import BookList from '../BookList';
import { getBooks } from '../API/api';
import { Book } from '@/lib/book';
import EbookCard from '../EbookCard';
import Link from 'next/link';

export default function HomePage() {
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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Digital Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (

        <EbookCard book={book} />
      
      ))}
    </div>
    </div>
  );
}
