import React, { useEffect, useState } from 'react';
import { jobPosition as allPostion } from '@/constant/jobPosition';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useCareerTalk } from '@/store/careerTalk.store';
import { useCategoryStore } from '@/store/category.store';
import PositionModalItem from './PositionModalItem';

const PositionModal = () => {
  const { setModal, initialPosition: selectedJob, setPosition } = useCareerTalk();
  const { setCategory } = useCategoryStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectPosition, setSelectPosition] = useState<string | null>(null);
  const [initialPosition, setInitialPosition] = useState<string>(selectedJob);

  const $portalRoot = document.getElementById('root-portal');

  if ($portalRoot == null) {
    return null;
  }

  const handleClick = (title: string) => {
    setInitialPosition('');
    setSelectPosition(title);
  };

  const handleSubmit = () => {
    const res = allPostion?.find((item) => item.title === selectPosition);
    if (res) {
      setPosition(res?.title);
      setModal(false);
      setCategory(res.title);
    }
  };

  return createPortal(
    <div className="w-[361px] h-[190px] rounded-lg mx-auto">
      <div className="mt-3 h-[72px] py-[25px] bg-white border-b-4 border-neutral-200 items-center justify-end relative">
        <div className="text-center text-black text-md font-medium font-pretendard leading-snug">
          직무 변경
        </div>
        <div
          onClick={() => {
            setModal(false);
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
            <PositionModalItem
              title={position.title}
              handleClick={handleClick}
              selectPosition={selectPosition}
              initialPosition={initialPosition}
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
    </div>,
    $portalRoot
  );
};

export default PositionModal;
