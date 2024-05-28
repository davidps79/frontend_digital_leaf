'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handlePayUResponse } from '@/app/API/api';

const PayUResponse = () => {
  const router = useRouter();

  useEffect(() => {
    const processPayUResponse = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(queryParams.entries());
    
      console.log("SAPOOOOOOOOOOOOOO", params)
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
    <div>
      <h1>Processing Payment...</h1>
    </div>
  );
};

export default PayUResponse;
