'use client';
import Footer from '@/components/footer/Footer';
import SelectSeatIndex from '@/components/reservation/focuszone/selectSeat/SelectSeatIndex';
import MainContainer from '@/components/shared/MainContainer';
import React from 'react';

const SelectSeatPage = () => {
  return (
    <MainContainer>
      <SelectSeatIndex />
      <Footer />
    </MainContainer>
  );
};

export default SelectSeatPage;
