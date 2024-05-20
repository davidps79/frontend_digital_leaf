'use client'
import React, { useEffect, useState } from 'react'
import { Book } from '@/lib/book';
import Image from 'next/image';
import { downloadEbookCover } from './crudImageEbook/downloadEbookCover';
import StarRating from './StarRating';
import Link from 'next/link';

const EbookCard = ({ book }: { book: Book }) => {

    const [filePath, setFilePath] = useState("");

    useEffect(() => {
        async function fetchImage() {
            downloadEbookCover(book.ebookCover).then((value) => {
                if (value) {
                    setFilePath(URL.createObjectURL(value));
                }
            })
        }
        fetchImage();
    }, [book]);

    return (
        <div>
            <Link href={`/ebook/${book.id}`} passHref>
            <div className='mb-4 max-h-56 h-full bg-neutral-100 p-2 flex items-center justify-center'>
                <Image alt={`${book.title} cover`} className="w-[80%] h-[100%] mb-4 rounded"  width={40} height={80} src={filePath} />
            </div>
            <div className="flex justify-between">
                <div>
                    <h3 className="font-bold">
                        {book.title}
                    </h3>

                    <h4 className='text-neutral-600'>
                        {book.author.penName}
                    </h4>

                    <h3 className='font-semibold mt-2'>
                        ${book.price}
                    </h3>
                </div>

                <div className="flex justify-center items-center h-[7vh] flex-row">
                    <StarRating rating={book.rating} />
                    <p className='font-semibold ml-1' >  {book.rating}</p>
                </div>

            </div>
            </Link>
        </div>
    )
}

export default EbookCard;