/* eslint-disable react/jsx-pascal-case */
'use client';
import WriteCareerPost from '@/components/community/WriteCareerPost';
import WriteInterestPost from '@/components/community/WriteInterestPost';
import MainContainer from '@/components/shared/MainContainer';
import SEO from '@/components/shared/SEO';
import { useRouter } from 'next/router';
import React from 'react';

const WritePostPage = () => {
  const router = useRouter();
  const { category } = router.query as { category: string };

  return (
    <>
      <SEO title="Offispace | 글 작성" />
      <MainContainer>
        {category === 'career' ? <WriteCareerPost /> : ''}
        {category === 'interest' ? <WriteInterestPost /> : ''}
      </MainContainer>
    </>
  );
};

export default WritePostPage;
