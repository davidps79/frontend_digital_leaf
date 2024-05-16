import React from 'react'
import Image from 'next/image'
import { IconShoppingBag, IconUser, IconBookmarks, IconSearch } from '@tabler/icons-react'

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

            <IconSearch/>

            <div className='flex gap-4 items-center'>
                <IconBookmarks />
                <IconShoppingBag />
                <IconUser />
            </div>
        </div>
    )
}

export default Navbar