import React from 'react';

const PopularPostsItem = () => {
  return (
    <div className="w-full py-4 border-b border-neutral-300 flex-col justify-start gap-2.5 inline-flex">
      <div className="flex flex-row justify-between">
        <div>태그자리</div>
        <div>하트자리</div>
      </div>
      <div className="text-neutral-800 text-base font-bold font-pretendard">텍스트</div>
    </div>
  );
};

export default PopularPostsItem;
