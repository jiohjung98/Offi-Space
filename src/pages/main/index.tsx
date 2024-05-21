'use client';
import Footer from '@/components/footer/Footer';
import MainPageIndex from '@/components/home/MainPageIndex';
import MainContainer from '@/components/shared/MainContainer';
import React from 'react';

const index = () => {
  return (
    <MainContainer>
      <MainPageIndex />
      <Footer />
    </MainContainer>
  );
};

export default index;
