'use client';
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { IconUser, IconBookmarks, IconSearch, IconShoppingBag } from '@tabler/icons-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { openCart } from '@/redux/cartSlice';
import { Button } from '@/components/ui/button';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ListItem } from './ListItem';
import { AlertDialogContext } from './AlertDialogProvider';

const categories = ['Fantasía', 'Comedia', 'Cuentos clásicos', 'Ciencia ficción', 'Historia', 'Misterio', 'Romance', 'Horror', 'Thriller']

const Navbar = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);

    const handleSearchClick = () => {
        if (search) {
            router.push(`/filter/search/${search}`);
        }
    };

    const dispatch = useAppDispatch();
    const { showAlertDialog } = useContext(AlertDialogContext);

    const handleOpenCart = () => {
        if (!token) {
            showAlertDialog("Inicia sesión", "Debes iniciar sesión para acceder al carrito");
        } else {
            dispatch(openCart());
        }
    };


    const handleProfile = () => {
        if (!token) {
            showAlertDialog("Inicia sesión", "Debes iniciar sesión para acceder al perfil");
        } else {
            router.push("/profile")
        }
    };

    return (
        <div className="z-50 w-full h-[4.5rem]  bg-white flex justify-between px-12 py-4 fixed top-0 left-0">
            <div className='flex gap-10 items-center'>

                <Link href="/" passHref>
                    <Image className='w-fit h-full object-contain' src="/logo.png" width={30} height={15} alt="epa" />
                </Link>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                            <NavigationMenuContent className='bg-white p-4'>
                                <ul className='w-36'>
                                    {
                                        categories.map((category, idx) => (
                                            <ListItem key={idx} href={`/filter/category/${category}`} title={category} />
                                        ))
                                    }
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Recién llegados
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link legacyBehavior href="/" passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Colección selecta
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className='transition-all focus-within:bg-slate-100 bg-slate-50 flex gap-2 items-center pl-2'>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Buscar"
                    className="bg-transparent border-0 h-full focus:outline-0 w-[500px] px-3"
                    id="searchInput"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchClick();
                        }
                    }}
                />
                <Button variant="ghost" className="hover:!bg-slate-200 w-fit px-5">
                    <IconSearch className='w-5 h-5' onClick={handleSearchClick} />
                </Button>
            </div>

            <div className='flex gap-2 items-center'>
                <Button variant="ghost">
                    <IconBookmarks />
                </Button>

                <Button variant="ghost" onClick={handleOpenCart}>
                    <IconShoppingBag />
                </Button>

                <Button variant="ghost" onClick={handleProfile}>
                    <IconUser />
                </Button>
            </div>
        </div>
    )
}

export default Navbar