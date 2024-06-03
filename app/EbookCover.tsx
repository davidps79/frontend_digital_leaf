import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { downloadEbookCover } from './crudImageEbook/downloadEbookCover';
import { IconBook } from '@tabler/icons-react';

const EbookCover = ({ coverUrl }: { coverUrl: string }) => {
    const [filePath, setFilePath] = useState("");

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
        <div className='max-h-[80vh] h-full bg-neutral-100 p-2 flex items-center justify-center'>
            {
                filePath ?
                    <Image alt="Carátula del libro" className='max-h-[90%] object-contain h-full' width={400} height={600} src={filePath} />
                    :
                    <IconBook className='animate-pulse'/>
            }
        </div>)
}

export default EbookCover