"use client"

import React, { useEffect, useState } from 'react';
import { ReactReader } from 'react-reader';
import { downloadEbook } from '@/crudEbok/downloadEbook';
import { checkBookAuthor, checkBookOwnership, getBooksInfo } from './API/api';
import { useAppSelector } from '@/redux/hooks';
import { notFound } from 'next/navigation';
import logo from '@/public/logo.png'
import Image from 'next/image';
import { InfoEbookDto } from '@/lib/ebook';
import Link from 'next/link';

const EpubReader = ({ ebookId }: { ebookId: string }) => {
    const [location, setLocation] = useState<string>("0");
    const [error, setError] = useState(false);
    const [ebook, setEbook] = useState<{ buffer: ArrayBuffer, title: string, ownsBook: boolean } | null>(null);
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user?.id) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').id : null);
    const [visited, setVisited] = useState(new Set());

    useEffect(() => {
        const fetchEbook = async () => {
            const ebook: InfoEbookDto = await getBooksInfo(ebookId);
            if (!ebook) {
                setError(true)
                return;
            }

            const data = await downloadEbook(ebook.fileUrl);
            if (!data) {
                setError(true)
                return;
            }

            const buffer = await data.arrayBuffer();

            let ownsBook = false;
            if (token) {
                const bought = await checkBookOwnership(userId, ebook.id);
                const isAuthor = await checkBookAuthor(userId, ebook.id);
                ownsBook = bought || isAuthor;
            }

            setEbook({ buffer, ownsBook, title: ebook.title });
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
        (ebook.ownsBook || visited.size < 5) ?
            <ReactReader
                url={ebook.buffer}
                title={ebook.title}
                location={location}
                locationChanged={(epubcfi: string) => {
                    setLocation(epubcfi)

                    console.log(epubcfi)
                    const newV = new Set(visited)
                    newV.add(epubcfi)
                    setVisited(newV)
                }}
            />
            :
            <div className='w-full h-[80vh] flex justify-center items-center'>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg font-semibold'>
                        Has llegado al fin de la vista previa
                    </span>
                    <span className='mb-6'>
                        Compra el libro y accede al contenido completo
                    </span>

                    <Link className='underline underline-offset-1 hover:font-semibold transition-all' href={"/ebook/" + ebookId}>
                        Regresar a la tienda
                    </Link>
                </div>
            </div>

    )
}

export default EpubReader;