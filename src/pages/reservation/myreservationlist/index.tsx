'use client';
import Footer from '@/components/footer/Footer';
import MyReservationListIndex from '@/components/reservation/myReservationList/MyReservationListIndex';
import MainContainer from '@/components/shared/MainContainer';
import React from 'react';

const MyReservationListPage = () => {
  return (
    <MainContainer>
      <MyReservationListIndex />
      <Footer />
    </MainContainer>
  );
};

export default MyReservationListPage;
