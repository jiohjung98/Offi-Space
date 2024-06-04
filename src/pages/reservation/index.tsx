'use client';
import Layout from '@/components/layout/Layout';
import ReservationIndex from '@/components/reservation/ReservationIndex';
import MainContainer from '@/components/shared/MainContainer';
import React from 'react';

const ReservationPage = () => {
  return (
    <MainContainer>
      {/* todo 예약 페이지는 nav바 바꿔야 함. 현재 Layout X */}
      <Layout>
        <ReservationIndex />
      </Layout>
    </MainContainer>
  );
};

export default ReservationPage;
