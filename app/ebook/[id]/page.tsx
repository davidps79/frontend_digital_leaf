import React from 'react'
import Link from 'next/link';
import EbookCard from '../../EbookCard';
import EbookDetails from '@/app/EbookCover';

const page = ({params} : {params: any}) => {
    return (
        <div className='h-fit grid grid-cols-2 gap-x-4 gap-y-16'>
            <EbookDetails ebookId={params.id}/>

            <div className='space-y-6 col-span-2'>
                <div className='flex w-full justify-between'>
                    <h2 className='font-bold text-xl'>Más libros de J.R.R Tolkien</h2>
                    <Link href="" className='underline underline-offset-1 font-semibold'>ver todos</Link>
                </div>

                <div className='grid grid-cols-4 gap-4'>
                    <EbookCard />
                    <EbookCard />
                    <EbookCard />
                    <EbookCard />
                </div>
            </div>

            <div className='space-y-6 col-span-2'>
                <div className='flex w-full justify-between'>
                    <h2 className='font-bold text-xl'>Más libros de fantasía</h2>
                    <Link href="" className='underline underline-offset-1 font-semibold'>ver todos</Link>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <EbookCard />
                    <EbookCard />
                    <EbookCard />
                    <EbookCard />
                </div>
            </div>
        </div>
    )
}

export default page;