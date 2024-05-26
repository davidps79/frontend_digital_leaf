import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { downloadEbookCover } from './crudImageEbook/downloadEbookCover';
import { IconBook } from '@tabler/icons-react';

const EbookCartImage = ({ url }: { url: string }) => {
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
        <div className='h-32 w-32 bg-neutral-100 flex items-center justify-center'>
            <IconBook className='h-6 w-6 animate-pulse' />
        </div>)


    return (
        <div className={'h-32 w-32 transition-colors bg-neutral-100 flex items-center justify-center' + (filePath ? " group-hover:bg-neutral-200" : "")}>
            <Image alt="cart cover" className="group-hover:scale-[80%] group-hover:rotate-6 transition-transform max-h-[80%] object-contain" width={180} height={360} src={filePath} />
        </div>)
}

export default EbookCartImage