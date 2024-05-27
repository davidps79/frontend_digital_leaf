'use client';

import React, { useEffect } from 'react';
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
import { removeFromCart, closeCart, fetchShoppingCart, purchaseCart } from '@/redux/cartSlice';
import { ScrollArea } from "@/components/ui/scroll-area";

const SideCart = () => {
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const isCartOpen = useAppSelector((state: RootState) => state.cart.isCartOpen);
    const dispatch = useAppDispatch();

    return (
        <Sheet open={isCartOpen} onOpenChange={() => dispatch(closeCart())}>
            <SheetContent className='sm:max-w-[34rem] w-[34rem] !p-0'>
                <h2 className='mx-6 mt-6 mb-4 text-xl font-semibold'>
                    Carrito
                </h2>

                <ScrollArea className="w-full h-[78%] mb-6">
                    <div className='w-full space-y-4 px-6'>
                        {cartItems.map((item) => (
                            <div className='flex gap-6 w-full items-center' key={item.book.id}>
                                <div className='w-32'>
                                    <EbookCartImage url={item.book.ebookCover} />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <h4 className='font-semibold mb-1'>
                                        {item.book.title}
                                    </h4>
                                    <h5 className='text-slate-800 mb-4'>
                                        {item.book.isbn}
                                    </h5>

                                    <h5 className='text-lg font-semibold'>
                                        ${formatCurrency(item.book.price)}
                                    </h5>
                                </div>

                                <Button variant="ghost" onClick={() => dispatch(removeFromCart(item.book))}>
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
                            ${formatCurrency(cartItems.reduce((acc, curr) => acc + curr.book.price, 0))}
                        </h2>
                    </div>

                    <Button className='w-full' size="lg" >
                        Checkout
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SideCart;
