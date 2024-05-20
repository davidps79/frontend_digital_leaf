import React from 'react';

interface StarRatingProps {
  rating: number; 
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const percentage = (rating / 5) * 100;

  return (
    <div className="text-[40px] relative inline-block pb-[6px]">
      <span style={{
        color: 'gray',
        borderColor: '#FBBF24',
        background: `linear-gradient(90deg, #FBBF24 ${percentage}%, #E5E5E5 ${percentage}%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block'
      }}>
        ★
      </span>
    </div>
  );
};

export default StarRating;
