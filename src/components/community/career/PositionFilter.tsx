import { useCareerTalk } from '@/store/careerTalk.stroe';
import { usePopularPostsStore } from '@/store/popularPosts.store';
import React, { useEffect } from 'react';

const PositionFilter = () => {
  const { initialPosition, setModal } = useCareerTalk();
  const { setCategory } = usePopularPostsStore();

  useEffect(() => {
    setCategory(initialPosition);
  }, [initialPosition, setCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [initialPosition]);

  return (
    <div
      onClick={() => setModal(true)}
      className="w-[361px] mt-[32px] mx-[16px] h-12 bg-stone-100 rounded-lg flex items-center cursor-pointer">
      <div className="border-r-2 border-neutral-300 ml-[12px]">
        <div className="pr-[12px]">내 관심 직무</div>
      </div>
      <div className="flex-1 text-center">
        <span className="text-space-purple font-bold">{initialPosition}</span>
      </div>
      <div className="flex justify-center items-center mr-2">
        <img src="/community/toBottom.png" alt="" />
      </div>
    </div>
  );
};

export default PositionFilter;
