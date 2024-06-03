'use client';

import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent
} from "@/components/ui/sheet";
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IconTrash } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import EbookCartImage from './EbookCartImage';
import { formatCurrency } from '@/lib/utils';
import { closeCart, fetchShoppingCart, purchaseCart, updateCart } from '@/redux/cartSlice';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';

const SideCart = () => {
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const isCartOpen = useAppSelector((state: RootState) => state.cart.isCartOpen);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state: RootState) => state.auth.token);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (isCartOpen && token) {
            dispatch(fetchShoppingCart());
        } else if (!token) {
            dispatch(closeCart())
        }
    }, [isCartOpen, token, dispatch, router]);

    const handleRemoveFromCart = async (bookId: string) => {
        await dispatch(updateCart({ ebookIds: [bookId], operation: 'remove' }));
        dispatch(fetchShoppingCart());
    };

    const handleCheckout = async () => {
        try {
            const htmlResponse = await dispatch(purchaseCart()).unwrap();
            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(htmlResponse);
                newWindow.document.close();
            } else {
                console.error("Failed to open new window for payment redirection.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    const totalAmount = Array.isArray(cartItems) ? cartItems.reduce((acc, curr) => {
        if (curr.book && curr.book.price) {
            return acc + curr.book.price * curr.quantity;
        }
        return acc;
    }, 0) : 0;

    return (
        <Sheet open={isCartOpen} onOpenChange={() => dispatch(closeCart())}>
            <SheetContent className='sm:max-w-[34rem] w-[34rem] !p-0'>
                <h2 className='mx-6 mt-6 mb-4 text-xl font-semibold'>
                    Carrito
                </h2>

                <ScrollArea className="w-full h-[78%] mb-6">
                    <div className='w-full space-y-4 px-6'>
                        {Array.isArray(cartItems) && cartItems.map((item) => (
                            <div className='flex gap-6 w-full items-center' key={item.book.id}>
                                <div className='w-32'>
                                    {item.book.ebookCover && <EbookCartImage url={item.book.ebookCover} />}
                                </div>

                                <div className='flex flex-col w-full'>
                                    <h4 className='font-semibold mb-1'>
                                        {item.book.title}
                                    </h4>
                                    <h5 className='text-slate-800 mb-4'>
                                        {item.book.isbn}
                                    </h5>

                                    <h5 className='text-lg font-semibold'>
                                        ${item.book.price ? formatCurrency(item.book.price) : 'N/A'}
                                    </h5>
                                </div>

                                <Button variant="ghost" onClick={() => handleRemoveFromCart(item.book.id)}>
                                    <IconTrash />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className='px-6 flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-semibold text-xl'>
                            Total
                        </h2>

                        <h2 className='font-semibold text-2xl'>
                            ${formatCurrency(totalAmount)}
                        </h2>
                    </div>

                    <Button className='w-full bg-black' size="lg" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SideCart;
