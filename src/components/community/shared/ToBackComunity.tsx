import { useRouter } from 'next/router';
import React from 'react';

const ToBackComunity = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="mt-[60px] cursor-pointer py-3 max-w-max">
      <img src="/community/back.svg" alt="" />
    </div>
  );
};

export default ToBackComunity;
