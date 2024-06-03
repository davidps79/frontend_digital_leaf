import React, { Suspense } from 'react';
import EpubReader from '../../EpubReader';

const Page = ({ params }) => {
    return (
        <div className='flex flex-col w-full h-full justify-center'>
            <div className="w-full h-[80vh]">
                <EpubReader ebookId={params.id} />
            </div>
        </div>
    )
}

export default Page