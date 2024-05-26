import React from 'react'
import { SheetTrigger, } from "@/components/ui/sheet"
import { IconShoppingBagPlus } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { RootState } from '@/redux/store';
import { addToCart } from '@/redux/cartSlice';
import { InfoEbookDto } from '@/lib/ebook';

const CartButton = ({ebook} : {ebook: InfoEbookDto}) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state: RootState) => state.cart.items);

    return (
        <SheetTrigger asChild>
            <Button onClick={() => {dispatch(addToCart(ebook))}} variant="default" size="lg" className='w-full'>
                Añadir al carrito
                <IconShoppingBagPlus className='ml-2' />
            </Button>
        </SheetTrigger>)
}

export default CartButton