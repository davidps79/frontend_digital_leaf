import React from 'react';
import { Book } from '@/lib/book';
import EbookListImage from './EbookListImage';

const EbookBar = ({ book }: { book:Book }) => {

    return (
        <a href={`/`}>
            <div className='flex flex-row'>          
                <div className='h-24 '>
                    <EbookListImage coverUrl={book.ebookCover} />
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
