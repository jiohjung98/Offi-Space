import { useRouter } from 'next/router';
import React from 'react';

const SignUpButton = () => {
  const router = useRouter();
  return (
    <button
      className="w-[361px] h-12 px-3.5 bg-space-black rounded-lg justify-center items-center inline-flex text-white text-[15px] font-semibold font-pretendard leading-snug"
      onClick={() => router.push('/signup')}>
      회원가입
    </button>
  );
};

export default SignUpButton;
