import React, { useState, useRef, useEffect } from 'react';
import { InfoEbookDto } from '@/lib/ebook';
import { Slider } from '@mui/material';
import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';
import Rating from './Rating';
import { useAppSelector } from '@/redux/hooks';
import LoginRequiredPopup from './LoginRequiredPopup';
import { addVote, checkBookOwnership } from './API/api';
import OwnershipEbookPopup from './OwnershipEbookPopup';

const RatingPopup: React.FC<{ ebook: InfoEbookDto;}> = ({ ebook,  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState<number>(ebook.rating);
    const popupRef = useRef<HTMLDivElement>(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showOwnerShipPopup, setShowOwnerShipPopup] = useState(false);
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user?.id) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').id : null);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setRating(newValue as number);
    };

    const togglePopup = async () => {
        if (!token) {
            setShowLoginPopup(true);
        } else {
            if (await checkBookOwnership(userId, ebook.id)) {
                setIsOpen(!isOpen);
            } else {
                setShowOwnerShipPopup(true);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addVote(ebook.id, rating, token);
            setIsOpen(false);
            //onRatingSubmit(); 
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const renderStars = (rating: number) => {
        const value = Math.round(rating * 2) / 2;
        const filledStars = Math.floor(value);
        const halfStars = Math.ceil(value - filledStars);
        const emptyStars = 5 - (filledStars + halfStars);

        const starStyle = { width: `50px`, height: `50px` };
        const slideStyle = { width: `270px`, height: `2px`, top: `-40px` };

        return (
            <div>
                <div className="mx-auto">
                    <div className="flex items-center justify-center gap-1 text-amber-400 pt-5 ">
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
                </div>
                <div className="flex items-center justify-center">
                    <Slider
                        value={rating}
                        onChange={handleChange}
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={5}
                        step={0.5}
                        className="absolute opacity-0 cursor-pointer"
                        style={slideStyle}
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            <button onClick={togglePopup} className="flex gap-2">
                <Rating rating={ebook.rating} starSize={25} />
                <p className='ml-3 mt-1 text-lg bold font-semibold'>{ebook.numVotes} Votes</p>
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div ref={popupRef} className="bg-white p-6 rounded shadow-lg z-60">
                        <h2 className="text-2xl mb-4 font-semibold">Rate {ebook.title}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                {renderStars(rating)}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={togglePopup}
                                    className="px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showLoginPopup && (
                <LoginRequiredPopup onClose={() => setShowLoginPopup(false)} />
            )}
            {showOwnerShipPopup && (
                <OwnershipEbookPopup onClose={() => setShowOwnerShipPopup(false)} />
            )}
        </div>
    );
};

export default RatingPopup;
