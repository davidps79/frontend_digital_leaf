'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import { IconShoppingBag, IconUser, IconBookmarks, IconSearch, IconFilter, IconShoppingCart } from '@tabler/icons-react'
import FilterMenu from './FilterMenu'
import { getBooksBySearch } from './API/api';
import {useRouter} from 'next/navigation';

const Navbar = () => {

    const [search,setSearch] = useState('');
    const router = useRouter();

    const handleSearchClick = () => {
        if (search) {
            router.push(`/search/${search}`);
        }
    };


    return (
        <div className="w-full h-16  bg-white flex justify-between px-12 py-4 fixed top-0 left-0">
            <div className='flex gap-10 items-center'>
                <Image className='w-fit h-full object-contain' src="/logo.png" width={200} height={100} alt="epa" />

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
                <IconBookmarks />
                <IconShoppingCart />
                <IconUser />
            </div>
        </div>
    )
}

export default Navbar