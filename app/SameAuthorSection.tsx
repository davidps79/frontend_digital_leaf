import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EbookCard from './EbookCard'
import { getBooksByAuthorAmount } from './API/api';
import { Book } from '@/lib/book';
import EbookCardLoader from './EbookCardLoader';
import { AuthorInfoDto } from '@/lib/author';

const SameAuthorSection = ({ author }: { author: AuthorInfoDto }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooksByAuthorAmount(4, author.id);
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
                <h2 className='font-bold text-xl'>Más libros de {author.name}</h2>
                <Link href={`/filter/author/${author.id}`} className='underline underline-offset-1 font-semibold'>ver todos</Link>
            </div>
            {

                <div className='grid grid-cols-4 gap-4'>
                    {
                        books.length > 0 ?
                            books.map((book) => (
                                <EbookCard key={book.id} book={book} />
                            ))
                            :
                            Array(4).fill(0).map((_) => <EbookCardLoader />)
                    }
                </div>
            }
        </div>
    )
}

export default SameAuthorSection