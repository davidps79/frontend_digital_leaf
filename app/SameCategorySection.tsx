import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EbookCard from './EbookCard'
import { getBooksByCategoryAmount } from './API/api';
import { Book } from '@/lib/book';
import EbookCardLoader from './EbookCardLoader';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const SameCategorySection = ({ category }: { category: string }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooksByCategoryAmount(6, category);
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
                    <Carousel opts={{
                        align: 'start',
                        dragFree: true,
                        watchDrag: false,
                    }}>
                        <CarouselContent >
                            {
                                books.map((book) => (
                                    <CarouselItem className='basis-1/4'>
                                        <EbookCard key={book.id} book={book} />
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    :
                    Array(4).fill(0).map((_) => <EbookCardLoader />)
            }
        </div>
    )
}

export default SameCategorySection