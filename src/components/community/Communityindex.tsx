import dynamic from 'next/dynamic';
import React from 'react';
import PopularPosts from './shared/PopularPosts';
import PositionFilter from './career/PositionFilter';

const CommunityHeader = dynamic(
  () => import('@/components/community/shared/CommunityHeader'),
  {
    ssr: false
  }
);

const Communityindex = () => {
  return (
    <>
      <CommunityHeader />
      <PositionFilter />
      <PopularPosts />
    </>
  );
};

export default Communityindex;
