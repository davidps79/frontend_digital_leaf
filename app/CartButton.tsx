import React, { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { updateCart, openCart } from '@/redux/cartSlice';
import { InfoEbookDto } from '@/lib/ebook';
import { IconShoppingBagPlus } from '@tabler/icons-react';
import LoginRequiredPopup from './LoginRequiredPopup';
import { AlertDialogContext } from './AlertDialogProvider';

const CartButton = ({ ebook }: { ebook: InfoEbookDto }) => {
    const dispatch = useAppDispatch();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const token = useAppSelector((state) => state.auth.token);
    const {showAlertDialog} = useContext(AlertDialogContext);

    const handleAddToCart = () => {
        if (!token) {
            showAlertDialog("Inicia sesión", "Debes iniciar sesión para comprar un libro");
        } else {
            dispatch(updateCart({ ebookIds: [ebook.id], operation: 'add' }));
            dispatch(openCart());
        }
        
    };

    return (
        <div className='w-full'>
        <Button onClick={handleAddToCart} variant="default" size="lg" className='w-full'>
            Añadir al carrito
            <IconShoppingBagPlus className='ml-2' />
        </Button>
            {showLoginPopup && (
                <LoginRequiredPopup onClose={() => setShowLoginPopup(false)} />
            )}
        </div>
    );
};

export default CartButton;
