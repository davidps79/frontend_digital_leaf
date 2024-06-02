'use client'; 
import React, { useState } from 'react'
import Image from 'next/image'
import { IconShoppingBag, IconUser, IconBookmarks, IconSearch, IconFilter, IconShoppingCart } from '@tabler/icons-react'
import FilterMenu from './FilterMenu'
import Link from 'next/link';
import { getBooksBySearch } from './API/api';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { openCart } from '@/redux/cartSlice';
import LoginRequiredPopup from './LoginRequiredPopup';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);

    const handleSearchClick = () => {
        if (search) {
            router.push(`/filter/search/${search}`);
        }
    };

    const dispatch = useAppDispatch();

    const handleOpenCart = () => {
        if (!token) {
            setShowLoginPopup(true);
        } else {
            dispatch(openCart());
        }
    };


    const handleProfile = () => {
        if (!token) {
            setShowLoginPopup(true);
        } else {
            router.push("/profile")
        }
    };
    return (
        <div style={styles.overlay} className="w-full h-16  bg-white flex justify-between px-12 py-4 fixed top-0 left-0">
            <div className='flex gap-10 items-center'>

                <Link href="/" passHref>
                    <div>
                        <button
                            type="button"

                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Image className='w-fit h-full object-contain' src="/logo.png" width={30} height={15} alt="epa" />
                        </button>
                    </div>
                </Link>


                <ul className='flex gap-8'>
                    <li>Categorías</li>
                    <li><button onClick={() => router.push('/filter/rating/DESC')}>Colección selecta</button></li>
                    <li>Recién llegados</li>
                </ul>
            </div>

            <div className='flex gap-2 items-center'>
                <input
                    type="text"
                    placeholder="Buscar"
                    className="rounded-full w-[500px] h-[45px] border-2 border-gray-300 mr-2 pl-6"
                    id="searchInput"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <button
                    type="button"
                    onClick={handleSearchClick}
                    className="inline-flex justify-center w-[58px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <IconSearch />
                </button>
                
                <FilterMenu />
            </div>
            <div className='flex gap-4 items-center'>


                <div>
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <IconBookmarks />
                    </button>
                </div>

                
                <div>
                    <button
                        type="button"
                        onClick={handleOpenCart}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <IconShoppingCart />
                    </button>
                </div>
                

                <div>
                    <button
                        type="button"
                        onClick={handleProfile}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <IconUser />
                    </button>
                </div>
            </div>
            {showLoginPopup && (
                <LoginRequiredPopup onClose={() => setShowLoginPopup(false)} />
            )}
        </div>
    )
}
const styles = {
    overlay: {
        zIndex: 99999,
    },
};

export default Navbar