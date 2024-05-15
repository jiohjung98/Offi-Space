import MainContainer from '@/components/shared/MainContainer';
import dynamic from 'next/dynamic';
import React from 'react';

const Communityindex = dynamic(() => import('@/components/community/Communityindex'), {
  ssr: false
});

const CommunityPage = () => {
  return (
    <MainContainer>
      <Communityindex />
    </MainContainer>
  );
};

export default CommunityPage;
