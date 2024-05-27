import { useModalStore } from '@/store/modal.store';
import React from 'react';

const WritePostButton = () => {
  const { setOpen } = useModalStore();
  return (
    <div
      onClick={() => setOpen(true)}
      className="fixed bottom-[100px] z-10
    right-4 xl:right-1/3 xl:mr-7
    cursor-pointer w-12 h-12 rounded-full bg-space-purple flex justify-center items-center">
      <img src="/community/writePost.svg" alt="" />
    </div>
  );
};

export default WritePostButton;
