import { useCareerTalk } from '@/store/careerTalk.store';
import { useCategoryStore } from '@/store/category.store';
import React, { useEffect } from 'react';

const PositionFilter = () => {
  const { initialPosition, setModal } = useCareerTalk();
  const { setCategory } = useCategoryStore();

  useEffect(() => {
    setCategory(initialPosition);
  }, [initialPosition, setCategory]);

  return (
    <div
      onClick={() => setModal(true)}
      className="w-[361px] mt-[32px] mx-[16px] h-12 bg-stone-100 rounded-lg flex items-center cursor-pointer">
      <div className="border-r-2 border-neutral-300 ml-[12px]">
        <div className="pr-[12px] text-gray-900">내 관심 직무</div>
      </div>
      <div className="flex-1 text-center">
        <span className="text-space-purple font-bold">{initialPosition}</span>
      </div>
      <div className="flex justify-center items-center mr-2">
        <img src="/community/toBottom.svg" alt="" />
      </div>
    </div>
  );
};

export default PositionFilter;
