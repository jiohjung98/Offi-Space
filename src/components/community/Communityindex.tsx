'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { useCurrentTalkStore } from '@/store/currentTalk.store';
import InterestFilter from './interest/InterestFilter';
import PostsLayout from './shared/PostsLayout';
import WritePostButton from './shared/WritePostButton';
import { useModalStore } from '@/store/modal.store';
import CreateModal from './shared/modal/CreateModal';

const CommunityHeader = dynamic(
  () => import('@/components/community/shared/CommunityHeader'),
  { ssr: false }
);
const PositionFilter = dynamic(
  () => import('@/components/community/career/PositionFilter'),
  { ssr: false }
);

const Communityindex = () => {
  const { open } = useModalStore();
  const { currentTalk } = useCurrentTalkStore();
  return (
    <div className="mt-20">
      <CommunityHeader />
      {currentTalk === 'career' ? <PositionFilter /> : <InterestFilter />}
      <PostsLayout />
      <div className="h-12" />
      <WritePostButton />
      {open ? <CreateModal /> : ''}
    </div>
  );
};

export default Communityindex;
