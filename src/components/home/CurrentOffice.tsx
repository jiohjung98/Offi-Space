'use client';
import React from 'react';

const CurrentOffice = () => {
  return (
    <>
      <div className="flex items-center  gap-[10px] mt-6 relative">
        <div className="text-white text-lg font-extralight">지금 이용중인 곳은</div>
        <div className="flex items-center justify-center gap-1">
          <div>
            <img src="/home/location.svg" alt="" />
          </div>
          <div className="text-white text-lg underline font-medium">강남1호점</div>

          {/* 현재 선택 지점과 이용중인 지점이 다를 때 */}
          {/* <div className="absolute right-[80px] top-[25px] z-50">
            <div className="ml-4">
              <img src="/home/isRight.svg" alt="" />
            </div>
            <div className="bg-space-purple-dark-active text-white text-sm font-normal p-2 rounded">
              이 지점이 맞나요?
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CurrentOffice;
