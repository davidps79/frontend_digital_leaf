'use client';

import React, { useEffect, useState } from 'react';
import EbookDetails from '@/app/EbookDetails';
import { checkBookAuthor, checkBookOwnership, getBooksInfo } from '../../API/api';
import { InfoEbookDto } from '@/lib/ebook';
import SameAuthorSection from '@/app/SameAuthorSection';
import SameCategorySection from '@/app/SameCategorySection';
import { Sheet, } from "@/components/ui/sheet"
import { useAppSelector } from '@/redux/hooks';
import { notFound } from 'next/navigation';
import LogoLoader from '@/app/LogoLoader';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<{ ebook: InfoEbookDto, ownsBook: boolean }>();
  const ebookId = params.id;
  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.user?.id) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').id : null);

  useEffect(() => {
    const fetchEbookInfo = async () => {
      const ebook = await getBooksInfo(ebookId);
      if (ebook) {
        let ownsBook = false;

        if (token) {
          const bought = await checkBookOwnership(userId, ebook.id);
          const isAuthor = await checkBookAuthor(userId, ebook.id);
          console.log(userId + " userId")
          console.log(ebook.id + " ebookId")
          console.log(bought + " bought")
          console.log(isAuthor + " isAuthor")
          ownsBook = bought || isAuthor;
        }
        
        setData({ ebook, ownsBook });
      } else {
        return notFound();
      }
    }

    fetchEbookInfo();
  }, []);

  if (!data) return <LogoLoader/>

  return (
    <Sheet>
      <div className='h-fit grid grid-cols-2 gap-x-4 gap-y-16'>
        <EbookDetails ebook={data.ebook} ownsBook={data.ownsBook} />
        <SameAuthorSection author={data.ebook.author} />
        <SameCategorySection category={data.ebook.category} />
      </div>
    </Sheet>
  );
};

export default Page;
