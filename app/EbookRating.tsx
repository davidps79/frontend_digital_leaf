import React, { useState, useContext } from 'react';
import { InfoEbookDto } from '@/lib/ebook';

import Rating from './Rating';
import { useAppSelector } from '@/redux/hooks';
import { AlertDialogContext } from './AlertDialogProvider';
import { Dialog } from '@/components/ui/dialog';
import RatingPopup from './RatingPopup';

const EbookRating: React.FC<{ ownsBook: boolean; ebook: InfoEbookDto; onRatingSubmit: (rating: number, votesCount: number) => void }> = ({ ebook, onRatingSubmit, ownsBook }) => {
    const token = useAppSelector((state) => state.auth.token);
    const { showAlertDialog } = useContext(AlertDialogContext);
    const [open, setOpen] = useState<boolean>(false);

    const togglePopup = async () => {
        if (!token) {
            showAlertDialog("Inicia sesión", "Debes iniciar sesión para puntuar un libro");
        } else {
            if (ownsBook) {
                setOpen(true)
            } else {
                showAlertDialog("Compra el libro primero", "Debes ser dueño de este libro para puntuarlo");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <RatingPopup close={() => setOpen(false)} ebook={ebook} onRatingSubmit={onRatingSubmit} token={token!} />

            <button onClick={togglePopup} className="flex gap-2">
                <Rating rating={ebook.rating} starSize={25} />
                <p className='ml-3 mt-1 text-lg bold font-semibold'>{ebook.numVotes} Votes</p>
            </button>
        </Dialog >
    );
};

export default EbookRating;
