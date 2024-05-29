import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';
import React from 'react';

interface RatingProps {
    rating: number;
    starSize?: number; 
}

const Rating: React.FC<RatingProps> = ({ rating, starSize = 16 }) => {
    const value: number = Math.round(rating * 2) / 2;
    const filledStars: number = Math.floor(value);
    const halfStars: number = Math.ceil(value - filledStars);
    const emptyStars: number = 5 - (filledStars + halfStars);

    const starStyle = { width: `${starSize}px`, height: `${starSize}px` };  

    return (
        <div className='flex gap-2 text-amber-400 mt-1 mb-1'>
            {Array(filledStars).fill(0).map((_, index) => (
                <IconStarFilled key={`filled-${index}`} style={starStyle} />
            ))}
            {Array(halfStars).fill(0).map((_, index) => (
                <IconStarHalfFilled key={`half-${index}`} style={starStyle} />
            ))}
            {Array(emptyStars).fill(0).map((_, index) => (
                <IconStar key={`empty-${index}`} style={starStyle} />
            ))}
        </div>
    );
};

export default Rating;
