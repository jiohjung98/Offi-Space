'use client';
import { userinfo } from '@/api/auth/auth.get.api';
import Footer from '@/components/footer/Footer';
import MainPageIndex from '@/components/home/MainPageIndex';
import MainContainer from '@/components/shared/MainContainer';
import { useMember, useSetMember } from '@/store/user';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

const Index = () => {
  /* eslint-disable */
  const member = useMember();
  const { data: memberData } = useQuery({ queryKey: ['userinfo'], queryFn: userinfo });
  const setmember = useSetMember();
  useEffect(() => {
    setmember(memberData?.data);
  }, [memberData, setmember]);

  return (
    <MainContainer>
      <MainPageIndex />
      <Footer />
    </MainContainer>
  );
};

export default Index;
