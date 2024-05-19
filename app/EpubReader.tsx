"use client"

import React, { useEffect, useState } from 'react';
import { ReactReader } from 'react-reader';
import { downloadEbook } from '@/crudEbok/downloadEbook';

const EpubReader = ({ title = "El hobbit", ebookId }: { title: string, ebookId: string }) => {
    const [location, setLocation] = useState<string | number>(5);
    const [url, setUrl] = useState<ArrayBuffer|null>(null);

    useEffect(() => {
        const fetchEbook = async () => {
            const data = await downloadEbook(ebookId);
            if (!data) return;
            
            const buf = await data.arrayBuffer();
            setUrl(buf);
        }

        fetchEbook()
    }, [])

    if (!url) return <></>

    return (
        <ReactReader
            url={url}
            title={title}
            location={location}
            locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        />
    )
}

export default EpubReader;