import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'

const LogoLoader = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Image src={logo} width={100} height={100} alt='Digital Leaf' className='animate-pulse' />
    </div>
  )
}

export default LogoLoader