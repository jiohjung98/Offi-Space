import { useRouter } from 'next/router';
import React from 'react';

const ToBackComunity = () => {
  const router = useRouter();
  // const onClickBackIcon = () => {
  //   sessionStorage.removeItem('scrollPosition');
  //   sessionStorage.removeItem('savedData');
  //   router.back()
  // }
  return (
    <div onClick={() => router.back()} className="cursor-pointer py-3 max-w-max">
      <img src="/community/back.svg" alt="" />
    </div>
  );
};

export default ToBackComunity;
