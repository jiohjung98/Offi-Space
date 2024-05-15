import React from 'react';

interface PopularPostsItemProps {
  contents: string;
  tag: string;
  index: number;
}

const PopularPostsItem = ({ contents, tag, index }: PopularPostsItemProps) => {
  return (
    <div
      className={`w-full py-4 flex-col justify-start gap-2.5 inline-flex
    ${index === 2 ? '' : 'border-b border-neutral-300'} 
    `}>
      <div className="flex flex-row justify-between">
        {/* 태그자리 */}
        <div className="py-1 px-2 bg-stone-100 rounded-lg">
          <div className="text-xs font-medium text-space-purple">{tag}</div>
        </div>
        {/* 하트자리 */}
        <div>하트자리</div>
      </div>
      <div className="text-neutral-800 text-base font-medium">{contents}</div>
    </div>
  );
};

export default PopularPostsItem;
