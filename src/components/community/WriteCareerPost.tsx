import React from 'react';
import ToBackComunity from './shared/ToBackComunity';

const WriteCareerPost = () => {
  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <div className="flex justify-between items-center">
        <ToBackComunity />
        <div className="text-lg font-bold leading-snug cursor-pointer">등록</div>
      </div>
    </div>
  );
};

export default WriteCareerPost;
