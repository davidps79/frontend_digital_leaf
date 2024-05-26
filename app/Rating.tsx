import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react'
import React from 'react'

const Rating = ({ rating }: { rating: number }) => {
    const value: number = Math.round(rating * 2) / 2;
    const filledStars: number = Math.floor(value);
    const halfStars: number = Math.ceil(value-filledStars);
    const emptyStars: number = 5-(filledStars+halfStars);



    return (
        <div className='flex gap-2 text-amber-400 mt-3 mb-2'>
            {
                Array(filledStars).fill(0).map((_) => (
                    <IconStarFilled className='h-4 w-4' />
                ))
            }

            {
                Array(halfStars).fill(0).map((_) => (
                    <IconStarHalfFilled className='h-4 w-4' />
                ))
            }

            {
                Array(emptyStars).fill(0).map((_) => (
                    <IconStar className='h-4 w-4' />
                ))
            }
        </div>
    )
}

export default Rating