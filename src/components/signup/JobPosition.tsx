/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import JobPositionItem from './JobPositionItem';
import { jobPosition as allPostion } from '@/constant/jobPosition';
import { motion } from 'framer-motion';

const JobPosition = ({ setSelectedJob, setShowJobPosition }: { setSelectedJob: (job: string) => void; setShowJobPosition: (show: boolean) => void; }) => {
  //todo : 이미 선택된 직무를 다시 변경 할 수 있으니까 초기 직무선택값을 받아야함
  const [selectPosition, setSelectPosition] = useState<string | null>(null);

  const handleClick = (title: string) => {
    setSelectPosition(title);
    setSelectedJob(title);
  };

  const handleSubmit = () => {
    //todo : 선택한 직무 넘기기
    const res = allPostion?.find((item) => item.title === selectPosition);
    console.log(res?.description);
    setShowJobPosition(false);
    
  };

  return (
    <div>
      <div className="mt-3 w-[393px] h-[72px] py-[25px] bg-white border-b-4 border-neutral-200 items-center justify-end relative">
        <div className="text-center text-black text-md font-medium font-pretendard leading-snug">
          직무선택
        </div>
        <div
          onClick={() => {
            handleSubmit()
          }}
          className="w-[18px] h-[18px] absolute top-[25px] right-[16px] cursor-pointer">
          <img src="/sign/positionClose.png" alt="" className="w-full" />
        </div>
      </div>

      <ul className="mt-[34px] mx-auto w-[361px]">
        {allPostion?.map((position, i) => (
          <motion.li
            key={i}
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
              title={position.title}
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
