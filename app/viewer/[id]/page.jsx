import React, { Suspense } from 'react';
import EpubReader from '../../EpubReader';

const Page = ({params}) => {
    return (
        <div className="w-full h-[80vh]">
            <Suspense fallback={<>Loading...</>}>
                <EpubReader ebookId={params.id} />
            </Suspense>
        </div>
    )
}

export default Page