import dynamic from 'next/dynamic';
import React from 'react';
import { useCurrentTalkStore } from '@/store/currentTalk.store';
import InterestFilter from './interest/InterestFilter';
import PostsLayout from './shared/PostsLayout';
import MainContainer from '../shared/MainContainer';

const CommunityHeader = dynamic(
  () => import('@/components/community/shared/CommunityHeader'),
  { ssr: false }
);
const PositionFilter = dynamic(
  () => import('@/components/community/career/PositionFilter'),
  { ssr: false }
);

const Communityindex = () => {
  const { currentTalk } = useCurrentTalkStore();

  return (
    <MainContainer>
      <CommunityHeader />
      {currentTalk === 'career' ? <PositionFilter /> : <InterestFilter />}
      <PostsLayout />
    </MainContainer>
  );
};

export default Communityindex;
