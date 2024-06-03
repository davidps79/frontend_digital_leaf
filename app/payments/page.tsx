'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handlePayUResponse } from '@/app/API/api';
import logo from '@/public/logo.png'
import Image from 'next/image';

const PayUResponse = () => {
  const router = useRouter();

  useEffect(() => {
    const processPayUResponse = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(queryParams.entries());

      try {
        await handlePayUResponse(params);

        router.push('/');
      } catch (error) {
        console.error('Error al enviar la respuesta de PayU al backend:', error);
      }
    };

    processPayUResponse();
  }, [router]);

  return (
    <div className='w-full bg-gray-100 h-full flex justify-center items-center'>
      <div className='animate-pulse flex flex-col gap-2 items-center'>
        <Image src={logo} width={80} height={80} alt='Digital Leaf' />
        <span className='text-lg font-semibold'>
          Estamos procesando el pago
        </span>
      </div>
    </div>
  );
};

export default PayUResponse;
