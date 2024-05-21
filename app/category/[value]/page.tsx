'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EbookCard from '../../EbookCard';
import { Book } from '@/lib/book';
import { getBooksByCategory } from '@/app/API/api';

const CategoryPage = ({ params }: { params: { value: string } }) => {
  const router = useRouter();
  const category  = params.value;
  console.log("Categoria: ",category);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const booksData = await getBooksByCategory(category);
        setBooks(booksData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    if (category) {
      fetchBooksByCategory();
    }
  }, [category]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Books in {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <EbookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;