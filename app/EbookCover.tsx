'use client'

import React, { useEffect, useState } from 'react'
import { IconShoppingBagPlus, IconBookmark, IconStar, IconStarFilled } from '@tabler/icons-react';
import { InfoEbook } from '@/lib/ebook';
import Link from 'next/link';
import apiClient from '@/app/apiClient';

const EbookDetails = ({ ebookId }: { ebookId: string }) => {
    const [ebook, setEbook] = useState<InfoEbook|null>(null);

    useEffect(() => {
        const fetchEbook = async () => {
            const res = await apiClient.get("ebooks/info/" + ebookId);
            setEbook(res.data);
        }

        fetchEbook();
    }, [])

    if (!ebook) return <>...</>

    return (
        <>
            <div className='max-h-[80vh] h-full bg-neutral-100 p-2 flex items-center justify-center'>
                <img src="/cover.jpeg" className='max-h-[80%]'></img>
            </div>

            <div className="ml-12 flex flex-col gap-8">
                <div>
                    <h2 className='text-2xl font-bold'>
                        {ebook.title}
                    </h2>

                    <h4 className='text-lg'>
                        por <strong className='font-semibold'>{ebook.author}</strong>
                    </h4>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <h3 className="font-semibold text-xl">
                        ${ebook.price}
                    </h3>

                    <div className="flex gap-2">
                        <button className="btn-primary">
                            Añadir al carrito
                            <IconShoppingBagPlus />
                        </button>

                        <button className='btn-secondary'>
                            <IconBookmark />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className='text-lg font-semibold'>
                        Vistazo general
                    </h4>
                    <p className='overflow-ellipsis line-clamp-6'>
                        {ebook.overview}
                    </p>

                    <Link href="viewer" className='underline underline-offset-1 font-semibold'>
                        Ver páginas de muestra
                    </Link>
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

                <div className='bg-neutral-100 p-6 grid grid-cols-2'>
                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'>ISBN</h5>
                        <p>{ebook.isbn}</p>
                    </div>

                    <div className='flex flex-col'>
                        <h5 className='text-sm font-semibold'># Edición</h5>
                        <p>{ebook.version}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EbookDetails;