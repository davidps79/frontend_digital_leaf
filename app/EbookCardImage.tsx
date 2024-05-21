import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { downloadEbookCover } from './crudImageEbook/downloadEbookCover';
import { IconBook } from '@tabler/icons-react';

const EbookCardImage = ({ url, title }: { url: string, title: string }) => {
    const [filePath, setFilePath] = useState("");

    useEffect(() => {
        async function fetchImage() {
            downloadEbookCover(url).then((value) => {
                if (value) {
                    setFilePath(URL.createObjectURL(value));
                }
            })
        }
        fetchImage();
    }, []);

    if (!filePath) return (
        <div className='mb-4 h-56 bg-neutral-100 flex items-center justify-center'>
            <IconBook className='h-12 w-12 animate-pulse' />
        </div>)


    return (
        <div className={'transition-colors mb-4 h-56 bg-neutral-100 flex items-center justify-center' + (filePath ? " group-hover:bg-neutral-200" : "")}>
            <Image alt={`${title} cover`} className="group-hover:scale-[80%] group-hover:rotate-6 transition-transform max-h-[80%] object-contain" width={180} height={360} src={filePath} />
        </div>)
}

export default EbookCardImage