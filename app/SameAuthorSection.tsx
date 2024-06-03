import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EbookCard from './EbookCard'
import { getBooksByAuthorAmount } from './API/api';
import { Book } from '@/lib/book';
import EbookCardLoader from './EbookCardLoader';
import { AuthorInfoDto } from '@/lib/author';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const SameAuthorSection = ({ author }: { author: AuthorInfoDto }) => {
    const [books, setBooks] = useState<Book[] | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooksByAuthorAmount(6, author.id);
                setBooks(booksData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className='space-y-6 col-span-2'>
            <meta charSet="UTF-8" />

            <div className='flex w-full justify-between'>
                <h2 className='font-bold text-xl'>Más libros de {author.name}</h2>
                <Link href={`/filter/author/${author.id}`} className='underline underline-offset-1 font-semibold'>ver todos</Link>
            </div>

            {
                books ?
                    <Carousel opts={{
                        align: 'start',
                        dragFree: true,
                        watchDrag: false,
                    }}>
                        <CarouselContent >
                            {
                                books.map((book, idx) => (
                                    <CarouselItem key={idx} className='basis-1/4'>
                                        <EbookCard key={book.id} book={book} />
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    :
                    <div className='grid grid-cols-4 gap-4'>
                        {
                            Array(4).fill(0).map((_, idx) => (
                                <EbookCardLoader key={idx} />
                            ))
                        }
                    </div>
            }
        </div >
    )
}

export default SameAuthorSection