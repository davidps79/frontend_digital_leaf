'use client';

import React, { useState } from 'react';
import { IconBookmark } from '@tabler/icons-react';
import { InfoEbookDto } from '@/lib/ebook';
import EbookCover from './EbookCover';
import CartButton from './CartButton';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import EbookRating from './EbookRating';
import { useRouter } from 'next/navigation';

const EbookDetails = ({ ebook, ownsBook }: { ebook: InfoEbookDto, ownsBook: boolean }) => {
    const [currentEbook, setCurrentEbook] = useState(ebook);
    const router = useRouter();

    const handleRatingSubmit = (ratingg: number, votesCount: number) => {
        setCurrentEbook({
            ...currentEbook,
            rating: ratingg,
            numVotes: votesCount
        });
    };

    return (
        <>
            <EbookCover coverUrl={currentEbook.ebookCover} />
            <div className="ml-12 flex flex-col gap-8">
                <div>
                    <h2 className='text-2xl font-bold'>
                        {currentEbook.title}
                    </h2>
                    <h4 className='text-lg'>
                        por <strong className='font-semibold'>{currentEbook.author.name}</strong>
                    </h4>
                </div>
                <div className="flex flex-col gap-4 mb-6">
                    <h3 className="font-semibold text-xl">
                        ${formatCurrency(currentEbook.price)}
                    </h3>
                    {
                        ownsBook ?
                            (<div className='flex flex-col gap-2 w-full pt-6'>
                                <Button onClick={() => "/viewer/" + ebook.id} variant="default" size="lg" className='w-full'>
                                    Leer Libro
                                </Button>
                            </div>) :
                            (
                                <div className="flex flex-col gap-2 w-full pt-3">
                                    <CartButton ebook={currentEbook} />
                                    <Button onClick={() => router.push("/viewer/" + ebook.id)} variant="outline">
                                        Ver páginas de muestra
                                    </Button>
                                </div>
                            )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className='text-lg font-semibold'>
                        Vistazo general
                    </h4>
                    <p className='overflow-ellipsis line-clamp-4'>
                        {currentEbook.overview}
                    </p>
                    <button className='w-fit underline underline-offset-1 font-semibold'>
                        Ver más
                    </button>
                </div>

                <EbookRating ebook={currentEbook} ownsBook={ownsBook} onRatingSubmit={handleRatingSubmit} />

                <div className='bg-neutral-100 space-y-1 p-6 grid grid-cols-2'>
                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'>ISBN</h5>
                        <p>{currentEbook.isbn}</p>
                    </div>
                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'># Edición</h5>
                        <p>{currentEbook.version}</p>
                    </div>
                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'>Categoría</h5>
                        <p>{currentEbook.category}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EbookDetails;
