'use client'; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EbookCard from '../../EbookCard';
import EbookDetails from '@/app/EbookDetails';
import { getBookById, getBooks, getBooksByAuthorAmount, getBooksByCategoryAmount, getBooksInfo } from '../../API/api';
import { Book } from '@/lib/book';
import { InfoEbook } from '@/lib/ebook';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [booksAuthor, setBooksAuthor] = useState<Book[]>([]);
  const [booksCategory, setBooksCategory] = useState<Book[]>([]);
  const [authorId,setAuthorId] = useState("");
  const [category,setCategory] = useState("");
  const [error, setError] = useState<string>('');
  const [ebook,setEbook] = useState<InfoEbook>();
  const idBook = params.id;

  useEffect(() => {

    const fetchBooksAuthor = async () => {
      try {
        const booksData = await getBooksByAuthorAmount(4,authorId);
        setBooksAuthor(booksData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    const fetchBooksCategory = async () => {
      try {
        const booksData = await getBooksByCategoryAmount(4,category);
        setBooksCategory(booksData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

      const fetchEbook = async () => {
        const book:Book = await getBookById(idBook);
        if(book){
          setCategory(book.category);
          setAuthorId(book.author.id);
        }

    }

    const fetchEbookInfo = async () => {
      const book = await getBooksInfo(idBook);
      if(book){
        setEbook(book);
      }

  }

    fetchBooksAuthor();
    fetchBooksCategory();
    fetchEbook();
    fetchEbookInfo();
  }, [authorId,category,idBook]);

  return (
    <div className='h-fit grid grid-cols-2 gap-x-4 gap-y-16'>
      {ebook && <EbookDetails ebook={ebook} />}

      <div className='space-y-6 col-span-2'>
        <div className='flex w-full justify-between'>
          <h2 className='font-bold text-xl'>Más libros de {ebook?.author}</h2>
          <Link href='' className='underline underline-offset-1 font-semibold'>ver todos</Link>
        </div>

        <div className='grid grid-cols-4 gap-4'>
          {booksAuthor.map((book) => (
            <EbookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      <div className='space-y-6 col-span-2'>
        <div className='flex w-full justify-between'>
          <h2 className='font-bold text-xl'>Más libros de {category}</h2>
          <Link href='' className='underline underline-offset-1 font-semibold'>ver todos</Link>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {booksCategory.map((book) => (
            <EbookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
