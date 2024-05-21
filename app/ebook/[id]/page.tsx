'use client';

import React, { useEffect, useState } from 'react';
import EbookDetails from '@/app/EbookDetails';
import { getBooksInfo } from '../../API/api';
import { InfoEbookDto } from '@/lib/ebook';
import SameAuthorSection from '@/app/SameAuthorSection';
import SameCategorySection from '@/app/SameCategorySection';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [ebook, setEbook] = useState<InfoEbookDto>();
  const ebookId = params.id;

  useEffect(() => {
    const fetchEbookInfo = async () => {
      const book = await getBooksInfo(ebookId);
      if (book) {
        setEbook(book);
      }
    }

    fetchEbookInfo();
  }, []);

  if (!ebook) return <>loading..</>

  return (
    <div className='h-fit grid grid-cols-2 gap-x-4 gap-y-16'>
      <EbookDetails ebook={ebook} />
      <SameAuthorSection author={ebook.author} />
      <SameCategorySection category={ebook.category} />
    </div>
  );
};

export default Page;
