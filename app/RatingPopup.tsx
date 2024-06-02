import React, { useState } from 'react'
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { addVote } from './API/api';
import { InfoEbookDto } from '@/lib/ebook';
import { Slider } from '@mui/material';
import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

const RatingPopup = ({ close, onRatingSubmit, ebook, token }: { close: any, onRatingSubmit: any, ebook: InfoEbookDto, token: string }) => {
    const [rating, setRating] = useState<number>(ebook.rating);

    const handleChange = (_: Event, newValue: number | number[]) => {
        setRating(newValue as number);
    };

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { ratingg, votesCount } = await addVote(ebook.id, rating, token);
            onRatingSubmit(ratingg, votesCount);
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
        close();
    };

    return (<DialogContent>
        <DialogHeader>
            <DialogTitle>Puntúa "{ebook.title}"</DialogTitle>
        </DialogHeader>

        {/* <h2 className="text-2xl mb-4 font-semibold">Rate {ebook.title}</h2> */}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                {renderStars(rating)}
            </div>
            <div className="flex gap-2 justify-end">
                <Button variant="secondary" onClick={() => close()}>
                    Cancelar
                </Button>
                <Button type="submit">
                    Enviar puntuación   
                </Button>
            </div>
        </form>
    </DialogContent>)
}

export default RatingPopup;