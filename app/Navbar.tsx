'use client';
import React from 'react'
import Image from 'next/image'
import { IconShoppingBag, IconUser, IconBookmarks, IconSearch, IconFilter, IconShoppingCart } from '@tabler/icons-react'
import FilterMenu from './FilterMenu'

const Navbar = () => {
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
                <input type="text" placeholder=" Buscar" className="rounded-full w-[500px] border-gray-400 mr-2" ></input>
                <IconSearch/>
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