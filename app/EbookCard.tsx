import React from 'react'

const EbookCard = () => {
    return (
        <div>
            <div className='mb-4 max-h-56 h-full bg-neutral-100 p-2 flex items-center justify-center'>
                <img src="/cover.jpeg" className='max-h-[80%]'></img>
            </div>

            <div>
                <h3 className="font-bold">
                    El Hobbit: Un viaje inesperado
                </h3>

                <h4 className='text-neutral-600'>
                    J.R.R Tolkien
                </h4>

                <h3 className='font-semibold mt-2'>
                    $84.200
                </h3>
            </div>
        </div>
    )
}

export default EbookCard;