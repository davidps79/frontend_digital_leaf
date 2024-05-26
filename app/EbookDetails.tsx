'use client'

import React from 'react'
import { IconBookmark, IconStar, IconStarFilled } from '@tabler/icons-react';
import { InfoEbookDto } from '@/lib/ebook';
import EbookCover from './EbookCover';
import CartButton from './CartButton';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';


const EbookDetails = ({ ebook }: { ebook: InfoEbookDto }) => {
    return (
        <>
            <EbookCover coverUrl={ebook.ebookCover} />
            <div className="ml-12 flex flex-col gap-8">
                <div>
                    <h2 className='text-2xl font-bold'>
                        {ebook.title}
                    </h2>

                    <h4 className='text-lg'>
                        por <strong className='font-semibold'>{ebook.author.name}</strong>
                    </h4>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    <h3 className="font-semibold text-xl">
                        ${formatCurrency(ebook.price)}
                    </h3>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 w-full">
                            <CartButton ebook={ebook} />
                            <Button variant="secondary" size="lg">
                                <IconBookmark />
                            </Button>
                        </div>

                        <Button variant="outline">
                            Ver páginas de muestra
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className='text-lg font-semibold'>
                        Vistazo general
                    </h4>
                    <p className='overflow-ellipsis line-clamp-4'>
                        {ebook.overview}
                    </p>

                    <button className='w-fit underline underline-offset-1 font-semibold'>
                        Ver más
                    </button>
                </div>

                <div className='flex gap-2 text-amber-400 mb-8'>
                    <IconStarFilled />
                    <IconStarFilled />
                    <IconStarFilled />
                    <IconStarFilled />
                    <IconStar className='mr-2' />
                    <p className='text-black font-semibold'>
                        67 votos
                    </p>
                </div>

                <div className='bg-neutral-100 space-y-1 p-6 grid grid-cols-2'>
                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'>ISBN</h5>
                        <p>{ebook.isbn}</p>
                    </div>

                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'># Edición</h5>
                        <p>{ebook.version}</p>
                    </div>

                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'>Categoría</h5>
                        <p>{ebook.category}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EbookDetails;