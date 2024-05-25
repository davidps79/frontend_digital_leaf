'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EbookCard from '../../../EbookCard';
import { Book } from '@/lib/book';
import { getBooksByCategory, getBooksBySearch } from '@/app/API/api';

const FilterPage = ({ params }: { params: { type: string, value: string } }) => {
  const router = useRouter();
  const { type, value } = params;
  console.log("Filter Type: ", type);
  console.log("Filter Value: ", value);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let booksData: Book[] = [];
        if (type === 'category') {
          booksData = await getBooksByCategory(value);
        } else if (type === 'search') {
          booksData = await getBooksBySearch(value);
        }
        setBooks(booksData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    if (type && value) {
      fetchBooks();
    }
  }, [type, value]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Results for {type}: {value}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <EbookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default FilterPage;