'use client'; 
import React from 'react';
import { Book } from '@/lib/book';
import Image from 'next/image';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (!books || books.length === 0) {
    return <div className="text-center">No books available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="p-4 border rounded shadow-sm">
          <Image alt={`${book.title} cover`} className="w-full h-48 object-cover mb-4 rounded"  width={0} height={0} src={book.ebookCover} />
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
        </div>
      ))}
    </div>
  );
};

export default BookList;
