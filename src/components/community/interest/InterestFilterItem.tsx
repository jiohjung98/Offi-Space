import { useInterestTalk } from '@/store/interestTalk.store';
import React, { useEffect, useState } from 'react';

interface InterestFilterItemProps {
  title: string;
}

const InterestFilterItem = ({ title }: InterestFilterItemProps) => {
  const { initialTag, setTag } = useInterestTalk();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (initialTag === title) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [initialTag, setIsSelected, title]);

  return (
    <div
      onClick={() => setTag(title)}
      className={`cursor-pointer w-max h-[33px] py-2 px-4 border border-neutral-300 rounded-2xl flex justify-center items-center
    ${isSelected ? 'bg-stone-500 text-white font-semibold' : 'bg-white text-stone-500 '}
    `}>
      <span>{title}</span>
    </div>
  );
};

export default InterestFilterItem;
