/* eslint-disable react/jsx-pascal-case */
'use client';
import Footer from '@/components/layout/footer/Footer';
import SelectSeatIndex from '@/components/reservation/focuszone/selectSeat/SelectSeatIndex';
import MainContainer from '@/components/shared/MainContainer';
import SEO from '@/components/shared/SEO';
import React from 'react';

const SelectSeatPage = () => {
  return (
    <>
      <SEO title="Offispace | 좌석 배치도" />
      <MainContainer>
        <SelectSeatIndex />
        <Footer />
      </MainContainer>
    </>
  );
};

export default SelectSeatPage;
