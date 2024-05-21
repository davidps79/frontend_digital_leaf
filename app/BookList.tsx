'use client'; 
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Book } from '@/lib/book';
import Image from 'next/image';
import { addToCart } from '../redux/cartSlice';
import { downloadEbookCover } from './crudImageEbook/downloadEbookCover';


interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const dispatch = useDispatch();

  if (!books || books.length === 0) {
    return <div className="text-center">No books available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAddToCart={() => dispatch(addToCart(book))} />
      ))}
    </div>
  );
};

interface BookCardProps {
  book: Book;
  onAddToCart: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  const [filePath, setFilePath] = useState<string>("");

  useEffect(() => {
    async function fetchImage() {
      const fileUrl = await downloadEbookCover(book.ebookCover);
      if (fileUrl) {
        setFilePath(URL.createObjectURL(fileUrl));
      }
    }

    fetchImage();
  }, [book.ebookCover]);

  return (
    <div className="p-4 border rounded shadow-sm">
      {filePath ? (
        <Image alt={`${book.title} cover`} className="w-full h-48 object-cover mb-4 rounded" width={0} height={0} src={filePath} />
      ) : (
        <div className="w-full h-48 bg-gray-200 mb-4 rounded">Loading...</div>
      )}
      <h3 className="text-xl font-bold">{book.title}</h3>

      <div className="flex justify-between">
        <div className="text-gray-900 font-bold">$ {book.price}</div>
        <div className="text-gray-500">Rating: {book.rating}</div>
      </div>

      <p className="text-gray-700">{book.author.penName}</p>
      <p className="text-gray-500">{book.publisher}</p>
      <p className="text-gray-500">{book.category}</p>
      <p className="text-gray-700">{book.overview}</p>
      <p className="text-gray-500">Stock: {book.stock}</p>

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookList;
