import React from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { updateCart, openCart } from '@/redux/cartSlice';
import { InfoEbookDto } from '@/lib/ebook';
import { IconShoppingBagPlus } from '@tabler/icons-react';

const CartButton = ({ ebook }: { ebook: InfoEbookDto }) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(updateCart({ ebookIds: [ebook.id], operation: 'add' }));
        dispatch(openCart());
    };

    return (
        <Button onClick={handleAddToCart} variant="default" size="lg" className='w-full'>
            Añadir al carrito
            <IconShoppingBagPlus className='ml-2' />
        </Button>
    );
};

export default CartButton;
