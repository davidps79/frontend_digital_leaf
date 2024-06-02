import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { downloadEbookCover } from './crudImageEbook/downloadEbookCover';
import { IconBook } from '@tabler/icons-react';

const EbookListCover = ({ coverUrl }: { coverUrl: string }) => {
    const [filePath, setFilePath] = useState<string|null>(null);

    useEffect(() => {
        async function fetchImage() {
            downloadEbookCover(coverUrl).then((value) => {
                if (value) {
                    setFilePath(URL.createObjectURL(value));
                }
            });
        }
        fetchImage();
    }, []);

    return (
        <div className='w-36 h-full bg-neutral-100 p-2 flex items-center justify-center'>
            {
                filePath ?
                    <Image alt="Carátula del libro" className='max-h-[90%] object-contain h-full' width={400} height={600} src={filePath} />
                    :
                    <IconBook className='bg-black animate-pulse' />
            }
        </div>)
}

export default EbookListCover