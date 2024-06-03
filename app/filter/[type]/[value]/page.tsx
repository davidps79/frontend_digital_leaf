'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EbookCard from '../../../EbookCard';
import { Book } from '@/lib/book';
import { getBooksByAuthor, getBooksByCategory, getBooksByRating, getBooksBySearch, getNumberBooksByCategory, getNumberBooksBySearch, getNumberBooksByAuthor, getNumberBooksByRating } from '@/app/API/api';
import LogoLoader from '@/app/LogoLoader';

const FilterPage = ({ params }: { params: { type: string, value: string } }) => {
  const router = useRouter();
  const booksPerPage = 12;
  const { type, value } = params;
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setBooks(null);
        let booksData: Book[] = [];
        let totalBooks: number=0;
        if (type === 'category') {
          booksData = await getBooksByCategory(value, currentPage, booksPerPage);
          totalBooks = await getNumberBooksByCategory(value);
          if(booksData.length>0){
            setCategory(booksData[0].category)
          }
        } else if (type === 'search') {
          booksData = await getBooksBySearch(value, currentPage, booksPerPage);
          totalBooks = await getNumberBooksBySearch(value);
        } else if (type == 'author') {
          booksData = await getBooksByAuthor(value, currentPage, booksPerPage);
          totalBooks = await getNumberBooksByAuthor(value);
          if(booksData.length>0){
            setAuthorName(booksData[0].author.penName);
          }
        } else if (type == 'rating') {
          booksData = await getBooksByRating(value);
          totalBooks = 0;
          if(value=='ASC'){
            setRate("Ascendent")
          }else{
            setRate("Descendent")
          }
        }
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

    if (type && value) {
      fetchBooks();
    }
  }, [type, value, currentPage]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if(!books){
    return <LogoLoader/>
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
        ) : type === 'rating' ? (
          <><h1 className="text-3xl font-bold text-center mb-8">Colección Selecta</h1><p className="text-2xl text-center mb-8">Los 20 libros más prestigiosos</p></>
        ) : (
          <h1 className="text-3xl font-bold text-center mb-8">Results for {type}: {value}</h1>
        )
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <EbookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;