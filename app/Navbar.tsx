'use client'; 
import React, { useState } from 'react'
import Image from 'next/image'
import { IconShoppingBag, IconUser, IconBookmarks, IconSearch, IconFilter, IconShoppingCart } from '@tabler/icons-react'
import FilterMenu from './FilterMenu'
import Link from 'next/link';
import { getBooksBySearch } from './API/api';
import {useRouter} from 'next/navigation';

const Navbar = () => {

    const [search,setSearch] = useState('');
    const router = useRouter();

    const handleSearchClick = () => {
        if (search) {
            router.push(`/filter/search/${search}`);
        }
    };


    return (
        <div className="w-full h-16  bg-white flex justify-between px-12 py-4 fixed top-0 left-0">
            <div className='flex gap-10 items-center'>
                
                <Link href="/ebooks" passHref>
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
                    <li>Colección selecta</li>
                    <li>Recién llegados</li>
                </ul>
            </div>

            <div className='flex gap-2 items-center'>
                <input 
                    type="text" 
                    placeholder="Buscar" 
                    className="rounded-full w-[500px] border-gray-400 mr-2" 
                    id="searchInput"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <IconSearch onClick={handleSearchClick} />
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

                <Link href="/shoppingcart" passHref>
                    <div>
                        <button
                        type="button"
                        
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        <IconShoppingCart />
                        </button>
                    </div>
                </Link>

                <Link href="/profile" passHref>
                    <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    <IconUser />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar