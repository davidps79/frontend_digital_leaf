"use client"

import React, { useEffect, useState } from 'react';
import { ReactReader } from 'react-reader';
import { downloadEbook } from '@/crudEbok/downloadEbook';
import { checkBookAuthor, checkBookOwnership, getBooksInfo } from './API/api';
import { useAppSelector } from '@/redux/hooks';
import { notFound } from 'next/navigation';
import logo from '@/public/logo.png'
import Image from 'next/image';

const EpubReader = ({ ebookId }: { ebookId: string }) => {
    const [location, setLocation] = useState<number>(1);
    const [error, setError] = useState(false);
    const [ebook, setEbook] = useState<{ buffer: ArrayBuffer, title: string, ownsBook: boolean } | null>(null);
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user?.id) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').id : null);

    useEffect(() => {
        const fetchEbook = async () => {
            const ebook = await getBooksInfo(ebookId);
            const data = await downloadEbook(ebookId);

            if (!ebook || !data) {
                setError(true)
                return;
            }

            let ownsBook = false;
            if (token) {
                const bought = await checkBookOwnership(userId, ebook.id);
                const isAuthor = await checkBookAuthor(userId, ebook.id);
                ownsBook = bought || isAuthor;

                const buffer = await data.arrayBuffer();
                setEbook({ buffer, ownsBook, title: ebook.title });
            }
        }

        fetchEbook();
    }, [])

    if (error) return notFound();

    if (!ebook) return (
        <div className='w-full bg-gray-100 h-[80vh] flex justify-center items-center'>
            <div className='animate-pulse flex flex-col gap-2 items-center'>
                <Image src={logo} width={80} height={80} alt='Digital Leaf' />
                <span className='text-lg font-semibold'>
                    Estamos cargando tu libro
                </span>
            </div>
        </div>
    )

    return (
        <ReactReader
            url={ebook.buffer}
            title={ebook.title}
            location={location}
            locationChanged={(epubcfi: string) => {
                const newValue = Number(epubcfi);
                if (ebook.ownsBook || newValue < 6)
                    setLocation(newValue)
            }}
        />
    )
}

export default EpubReader;