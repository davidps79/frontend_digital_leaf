import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EbookCard from './EbookCard'
import { getBooksByAuthorAmount, getBooksByCategoryAmount } from './API/api';
import { Book } from '@/lib/book';
import EbookCardLoader from './EbookCardLoader';

const SameCategorySection = ({ category }: { category: string }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooksByCategoryAmount(4, category);
                setBooks(booksData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className='space-y-6 col-span-2'>
            <div className='flex w-full justify-between'>
                <h2 className='font-bold text-xl'>Más libros de {category}</h2>
                <Link href='' className='underline underline-offset-1 font-semibold'>ver todos</Link>
            </div>
            {
                books ?
                    <div className='grid grid-cols-4 gap-4'>
                        {books.map((book) => (
                            <EbookCard key={book.id} book={book} />
                        ))}
                    </div>
                    :
                    <div>
                        {
                            Array(4).fill(0).map((_) => <EbookCardLoader />)
                        }
                    </div>
            }
        </div>
    )
}

export default SameCategorySection