import React, { Suspense } from 'react';
import EpubReader from '../../EpubReader';
import LogoLoader from '@/app/LogoLoader';

const Page = ({params}) => {
    return (
        <div className="w-full h-[80vh]">
            <Suspense fallback={<LogoLoader/>}>
                <EpubReader ebookId={params.id} />
            </Suspense>
        </div>
    )
}

export default Page