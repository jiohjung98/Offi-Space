import { useRouter } from 'next/router';
import React from 'react';

const WritePostButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/community/write')}
      className="fixed bottom-[110px] z-10
    right-4 xl:right-1/3 xl:mr-7
    cursor-pointer w-14 h-14 rounded-full bg-space-purple flex justify-center items-center">
      <img src="/community/writePost.svg" alt="" />
    </div>
  );
};

export default WritePostButton;
