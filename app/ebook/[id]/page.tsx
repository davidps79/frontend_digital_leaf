'use client'; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EbookCard from '../../EbookCard';
import EbookDetails from '@/app/EbookDetails';
import { getBooks } from '../../API/api';
import { Book } from '@/lib/book';

interface PageProps {
  params: {
    id: string;
  };
}

const getRandomBooks = (books: Book[], num: number): Book[] => {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Page: React.FC<PageProps> = ({ params }) => {
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

  const randomBooks = getRandomBooks(books, 4);

  return (
    <div className='h-fit grid grid-cols-2 gap-x-4 gap-y-16'>
      <EbookDetails ebookId={params.id} />

      <div className='space-y-6 col-span-2'>
        <div className='flex w-full justify-between'>
          <h2 className='font-bold text-xl'>Más libros de J.R.R Tolkien</h2>
          <Link href='' className='underline underline-offset-1 font-semibold'>ver todos</Link>
        </div>

        <div className='grid grid-cols-4 gap-4'>
          {randomBooks.map((book) => (
            <EbookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      <div className='space-y-6 col-span-2'>
        <div className='flex w-full justify-between'>
          <h2 className='font-bold text-xl'>Más libros de fantasía</h2>
          <Link href='' className='underline underline-offset-1 font-semibold'>ver todos</Link>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {randomBooks.map((book) => (
            <EbookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
