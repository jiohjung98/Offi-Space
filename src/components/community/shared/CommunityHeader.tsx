import { useCurrentTalkStore } from '@/store/currentTalk.store';
import React from 'react';

const CommunityHeader = () => {
  const { currentTalk, setCurentTalk } = useCurrentTalkStore();
  return (
    <header className="w-full flex gap-[20px] pl-[16px] pt-[12px] mt-4">
      <div
        className={`w-[73px] h-[41px] cursor-pointer font-pretendard] text-lg flex justify-center items-centerpt-3 pb-2
      ${currentTalk === 'career' ? 'text-gray-900 font-bold border-b-2 border-space-purple ' : 'text-gray-900'}
      `}
        onClick={() => setCurentTalk('career')}>
        커리어톡
      </div>
      <div
        className={`w-[73px] h-[41px] cursor-pointer font-pretendard] text-lg flex justify-center items-centerpt-3 pb-2
      ${currentTalk === 'interest' ? 'text-gray-900 font-bold border-b-2 border-space-purple ' : 'text-gray-900'}
      `}
        onClick={() => setCurentTalk('interest')}>
        관심톡
      </div>
    </header>
  );
};

export default CommunityHeader;
