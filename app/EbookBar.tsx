import React from 'react';
import { Book } from '@/lib/book';
import EbookCover from './EbookCover';

const EbookBar = ({ book }: { book:Book }) => {

    return (
        <a href={`/`}>
            <div className='flex flex-row'>          
                <div className='h-24 '>
                    <EbookCover coverUrl={book.ebookCover}></EbookCover>
                </div>  
                <div>
                    <p className='font-bold'>{book.title}</p>
                    <p>{book.author.penName}</p>
                    <p>{book.category}</p>
                </div>
            </div>
        </a>
    );
};

export default EbookBar;
