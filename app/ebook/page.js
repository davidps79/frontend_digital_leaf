import React from 'react'
import { IconShoppingBagPlus, IconBookmark } from '@tabler/icons-react';
import Link from 'next/link';

const page = () => {
    return (
        <div className='grid grid-cols-2 gap-6 max-h-[60vh]'>
            <div className='max-h-[80vh] h-full bg-neutral-100 p-2 flex items-center justify-center'>
                <img src="cover.jpeg" className='max-h-[80%]'></img>
            </div>

            <div className="max-h-[80vh] flex flex-col gap-8">
                <div>
                    <h2 className='text-2xl font-bold'>
                        El Hobbit, un viaje inesperado
                    </h2>

                    <h4 className='text-lg'>
                        Por <strong className='font-semibold'>J.R.R Tolkien</strong>
                    </h4>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <h3 className="font-semibold text-xl">
                        $84.200
                    </h3>

                    <div className="flex gap-2">
                        <button className="btn-primary">
                            Añadir al carrito
                            <IconShoppingBagPlus />
                        </button>

                        <button className='btn-secondary'>
                            <IconBookmark />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className='text-lg font-semibold'>
                        Vistazo general
                    </h4>
                    <p className='overflow-ellipsis line-clamp-6'>
                        Bilbo Bolsón es como cualquier hobbit: no mide más de metro y medio, vive pacíficamente en la Comarca, y su máxima aspiración es disfrutar de los placeres sencillos de la vida (comer bien, pasear y charlar con los amigos). Y es que todos ellos son tan vagos como bonachones, por naturaleza, y porque quieren. Pero una soleada mañana, Bilbo recibe la inesperada visita de Gandalf, el mago de larga barba gris y alto sombrero, que cambiará su vida para siempre.<br /><br />Con Gandalf y una pandilla de trece enanos, y con la ayuda de un mapa misterioso, nuestro héroe partirá hacia la Montaña Solitaria a fin de rescatar el valioso tesoro custodiado por Smaug el Dorado, un terrible y enorme dragón. Para eso tendrán que superar muchísimos peligros y toda clase de aventuras que Bilbo jamás hubiera podido ni imaginar y que lo convertirán en el hobbit más famoso del mundo. Lo que Bilbo no sabe es que el anillo que encontró en el camino será el principio de otra gran aventura… la de EL SEÑOR DE LOS ANILLOS.
                    </p>

                    <Link href="viewer" className='underline underline-offset-1 font-semibold'>
                        Ver páginas de muestra
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page;