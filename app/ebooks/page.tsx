'use client'; 
import { useState, useEffect } from 'react';
import BookList from '../BookList';
import { getBooks } from '../API/api';

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
      <BookList books={books} />
    </div>
  );
}
