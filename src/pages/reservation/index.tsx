'use client';
import Layout from '@/components/layout/Layout';
import ReservationIndex from '@/components/reservation/ReservationIndex';
import MainContainer from '@/components/shared/MainContainer';
import { useRouter } from 'next/router';
import React from 'react';

const ReservationPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const initialTab = typeof tab === 'string' ? tab : 'defaultTabValue';

  return (
    <MainContainer>
      <Layout>
      <ReservationIndex initialTab={initialTab} />
      </Layout>
    </MainContainer>
  );
};

export default ReservationPage;
