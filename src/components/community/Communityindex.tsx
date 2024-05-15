import dynamic from 'next/dynamic';
import React from 'react';
import PopularPosts from './shared/PopularPosts';
import PositionModal from './career/modal/PositionModal';
import { useCurrentTalkStore } from '@/store/currentTalk.store';
import InterestFilter from './interest/InterestFilter';
import { useCareerTalk } from '@/store/careerTalk.stroe';

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

  const { modalOpen } = useCareerTalk();
  if (modalOpen) {
    return <PositionModal />;
  }

  return (
    <>
      <CommunityHeader />
      {/* carrer인지 interest인지 filter 변경 */}
      {currentTalk === 'career' ? <PositionFilter /> : <InterestFilter />}

      {/* PopularPosts에서는 carrer인지 interest인지 상태값을 가져와서 알아서 api연결해서 인기글 가져오기 */}
      <PopularPosts />
    </>
  );
};

export default Communityindex;
