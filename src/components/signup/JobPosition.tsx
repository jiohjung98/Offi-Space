import React, { useState } from 'react';
import JobPositionItem from './JobPositionItem';
import { jobPosition } from '@/constant/jobPosition';
import { motion } from 'framer-motion';

const JobPosition = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allPosition, setAllPosition] = useState(() => Object.keys(jobPosition));
  const [selectPosition, setSelectPosition] = useState<string | null>(null);

  const handleClick = (title: string) => {
    setSelectPosition(title);
  };

  const handleSubmit = () => {
    //todo : 선택한 직무 넘기기
    alert('클릭');
  };

  return (
    <div>
      <div className="mt-6 w-[393px] h-[72px] py-[25px] bg-white border-b-4 border-neutral-200 items-center justify-end relative">
        <div className="text-center text-black text-md font-medium font-pretendard leading-snug">
          직무선택
        </div>
        <div
          onClick={() => {
            //todo : 모달 닫기
          }}
          className="w-[18px] h-[18px] absolute top-[25px] right-[16px] cursor-pointer">
          <img src="/sign/positionClose.png" alt="" className="w-full" />
        </div>
      </div>

      <ul className="mt-[34px] mx-auto w-[361px]">
        {allPosition?.map((position) => (
          <motion.li
            key={position}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut'
            }}
            animate={{
              opacity: 1,
              translateX: 0
            }}>
            <JobPositionItem
              title={position}
              handleClick={handleClick}
              selectPosition={selectPosition}
            />
          </motion.li>
        ))}
      </ul>
      {selectPosition == null ? (
        <div className="mx-auto w-[361px] mt-[54px]">
          <button
            disabled={true}
            className="mb-4 w-[361px] h-12 px-3.5 rounded-lg border border-black justify-center items-center inline-flex text-black text-[15px] font-semibold font-pretendard leading-snug">
            직무를 선택해주세요
          </button>
        </div>
      ) : (
        <div className="mx-auto w-[361px] mt-[54px]">
          <button
            onClick={handleSubmit}
            className="mb-4 w-[361px] h-12 px-3.5 bg-space-black rounded-lg justify-center items-center inline-flex text-white text-[15px] font-semibold font-pretendard leading-snug">
            등록
          </button>
        </div>
      )}
    </div>
  );
};

export default JobPosition;
