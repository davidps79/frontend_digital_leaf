'use client';

import React, { useState, useEffect } from 'react';
import { IconBookmark } from '@tabler/icons-react';
import { InfoEbookDto } from '@/lib/ebook';
import EbookCover from './EbookCover';
import CartButton from './CartButton';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import RatingPopup from './RatingPopup';
import { useAppSelector } from '@/redux/hooks';
import { checkBookAuthor, checkBookOwnership } from './API/api';

const EbookDetails = ({ ebook }: { ebook: InfoEbookDto }) => {
    const [currentEbook, setCurrentEbook] = useState(ebook);
    const [showBoughtBook, setShowBoughtBook] = useState(false);
    const [showBuyButton, setShowBuyButton] = useState(false);
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user?.id) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').id : null);

    const handleRatingSubmit = (ratingg: number, votesCount: number) => {
        setCurrentEbook({
            ...currentEbook,
            rating: ratingg,
            numVotes: votesCount
        });
    };

    const toggle = async () => {
        if (!token) {
            setShowBuyButton(true);
        } else {
            if (await checkBookOwnership(userId, ebook.id)) {
                setShowBoughtBook(true);
            } else if(await checkBookAuthor(userId, ebook.id)){
                setShowBoughtBook(true);
            }
            else {
                setShowBuyButton(true);
            }
        }
    };

    useEffect(() => {
        toggle();
    }, []); 

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
                    {showBuyButton && (
                        <div className="flex flex-col gap-2 w-full pt-3">
                            <div className="flex gap-2 w-full ">
                                <CartButton ebook={currentEbook} />
                                <Button variant="secondary" size="lg">
                                    <IconBookmark />
                                </Button>
                            </div>
                            <Button variant="outline">
                                Ver páginas de muestra
                            </Button>
                        </div>
                    )}
                    {showBoughtBook && (
                        <div className='flex flex-col gap-2 w-full pt-6'>
                            <Button variant="default" size="lg" className='w-full'>
                                Leer Libro
                            </Button>
                        </div>
                    )}
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
                <RatingPopup ebook={currentEbook} onRatingSubmit={handleRatingSubmit} />
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
