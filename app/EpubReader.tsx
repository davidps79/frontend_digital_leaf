"use client"

import React, { useState } from 'react';
import { ReactReader } from 'react-reader';

const EpubReader = () => {
    const [location, setLocation] = useState<string | number>(5)
    return (
        <ReactReader
            url="test.epub"
            location={location}
            locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        />
    )
}

export default EpubReader;