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
      className={`text-sm cursor-pointer w-max h-[33px] py-2 px-4 border-[1.5px] rounded-2xl flex justify-center items-center
    ${isSelected ? ' font-bold border-neutral-500' : ' border-neutral-300 text-gray-600'}
    `}>
      <span>{title}</span>
    </div>
  );
};

export default InterestFilterItem;
