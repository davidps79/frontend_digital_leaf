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
  const authorId = useAppSelector((state) => state.auth.profile?.author?.id );
  const userId = useAppSelector((state) => state.auth.user?.id) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').id : null);
  const user = useAppSelector((state) => state.auth.user) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null);

  useEffect(() => {
    const fetchEbookInfo = async () => {
      const ebook = await getBooksInfo(ebookId);
      if (ebook) {
        let ownsBook = false;

        if (token) {
          const bought = userId? await checkBookOwnership(userId, ebook.id) : false;
          const isAuthor = authorId? await checkBookAuthor(authorId, ebook.id) : false;
          const isAdmin = user.role === "Admin"
          ownsBook = bought || isAuthor || isAdmin;
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
