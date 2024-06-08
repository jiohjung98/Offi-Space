import React from 'react';
import { useRouter } from 'next/router';
import MainContainer from '@/components/shared/MainContainer';

const ChangePasswordDone = () => {
  const router = useRouter();
  return (
    <MainContainer>
      <div className="mt-[210px] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-[95.84px] h-[95.84px] bg-violet-100 rounded-full"></div>
          <div
            className="w-[82px] h-[100px] z-10 absolute"
            style={{ left: 18, top: -25 }}>
            <img src="/sign/doneCheck.png" alt="" className=" w-full" />
          </div>
        </div>
        <div className="mt-[32px]">
          <div className="text-center text-black text-[22px] font-semibold font-pretendard leading-[30.80px]">
            비밀번호 재설정이 <br />
            완료되었습니다.
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-2">
        <button
          className=" border text-space-purple border-space-purple mt-[100px] w-[361px] h-12 px-3.5 rounded-lg  justify-center items-center inline-flex text-[15px] font-medium font-pretendard leading-snug "
          type="submit"
          onClick={() => router.replace('/signin')}>
          로그인하러 가기
        </button>
      </div>
    </MainContainer>
  );
};

export default ChangePasswordDone;
