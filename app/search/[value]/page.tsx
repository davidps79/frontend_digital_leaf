'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EbookCard from '../../EbookCard';
import { Book } from '@/lib/book';
import { getBooksBySearch } from '@/app/API/api';

const SearchPage = ({ params }: { params: { value: string } }) => {
  const router = useRouter();
  const keyword  = params.value;
  console.log("Keyword: ",keyword);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const booksData = await getBooksBySearch(keyword);
        setBooks(booksData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    if (keyword) {
      fetchBooksByCategory();
    }
  }, [keyword]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Results of {keyword}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <EbookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;