/* eslint-disable react/jsx-pascal-case */
'use client';
import Footer from '@/components/layout/footer/Footer';
import MyReservationListIndex from '@/components/reservation/myReservationList/MyReservationListIndex';
import MainContainer from '@/components/shared/MainContainer';
import SEO from '@/components/shared/SEO';
import React from 'react';

const MyReservationListPage = () => {
  return (
    <>
      <SEO title="Offispace | 나의 예약" />
      <MainContainer>
        <MyReservationListIndex />
        <Footer />
      </MainContainer>
    </>
  );
};

export default MyReservationListPage;
