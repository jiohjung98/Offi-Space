'use client';
import Layout from '@/components/layout/Layout';
import ReservationIndex from '@/components/reservation/ReservationIndex';
import MainContainer from '@/components/shared/MainContainer';
import React from 'react';

const ReservationPage = () => {
  return (
    <MainContainer>
      <Layout>
        <ReservationIndex />
      </Layout>
    </MainContainer>
  );
};

export default ReservationPage;
