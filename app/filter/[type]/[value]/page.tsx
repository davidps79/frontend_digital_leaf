'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EbookCard from '../../../EbookCard';
import { Book } from '@/lib/book';
import { getBooksByAuthor, getBooksByCategory, getBooksBySearch } from '@/app/API/api';

const FilterPage = ({ params }: { params: { type: string, value: string } }) => {
  const router = useRouter();
  const { type, value } = params;
  console.log("Filter Type: ", type);
  console.log("Filter Value: ", value);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [category, setCategory] = useState<string>('');


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let booksData: Book[] = [];
        if (type === 'category') {
          booksData = await getBooksByCategory(value);
          console.log("BooksData: ",booksData);
          if(booksData.length>0){
            setCategory(booksData[0].category)
          }
        } else if (type === 'search') {
          booksData = await getBooksBySearch(value);
        } else if (type == 'author') {
          booksData = await getBooksByAuthor(value);
          if(booksData.length>0){
            setAuthorName(booksData[0].author.penName);
          }
          console.log("Author: ",value);
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

  if(!books){
    return <div className="text-center">Loading...</div>;
  }

  if(books.length==0){
    return <div className="text-center">No se encontraron libros</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <meta charSet="UTF-8" />
      {
        type === 'author' ? (
          <h1 className="text-3xl font-bold text-center mb-8">Results for {type}: {authorName}</h1>
        ) : type === 'category' ? (
          <h1 className="text-3xl font-bold text-center mb-8">Results for {type}: {category}</h1>
        ) : (
          <h1 className="text-3xl font-bold text-center mb-8">Results for {type}: {value}</h1>
        )
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <EbookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default FilterPage;