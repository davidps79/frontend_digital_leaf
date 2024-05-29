import { Book } from '@/lib/book';
import StarRating from './StarRating';
import Link from 'next/link';
import EbookCardImage from './EbookCardImage';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import Rating from './Rating';
import { formatCurrency } from '@/lib/utils';

const EbookCard = ({ book }: { book: Book }) => {
    return (
        <div className='group'>
            <Link href={`/ebook/${book.id}`} passHref>
                <EbookCardImage title={book.title} url={book.ebookCover} />

                <div className="flex justify-between">
                    <div>
                        <h3 className="font-bold text-xl">
                            {book.title}
                        </h3>

                        <h4 className='text-neutral-600 text-lg'>
                            {book.author.penName}
                        </h4>

                        <Rating rating={book.rating} starSize={18}/>
                        <h3 className='font-semibold mt-2'>
                            ${formatCurrency(book.price)}
                        </h3>

                    </div>


                    
                   

                </div>
            </Link>
        </div>
    )
}

export default EbookCard;