'use client';

import { useState, useEffect } from 'react';
import { getBooks } from './API/api';
import { Book } from '@/lib/book';
import EbookCard from './EbookCard';
import { getNumberBooks } from './API/api';
import LogoLoader from './LogoLoader';

export default function HomePage() {
  const booksPerPage = 12;
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setBooks(null);
        const booksData = await getBooks(currentPage, booksPerPage);
        const totalBooks = await getNumberBooks();
        setBooks(booksData);
        setTotalPages(Math.ceil(totalBooks / booksPerPage));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchBooks();
  }, [currentPage]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!books) {
    return <LogoLoader/>
  }

  if (books.length == 0) {
    return <div className="text-center">No se encontraron libros</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Librería Digital</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <EbookCard book={book} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}


