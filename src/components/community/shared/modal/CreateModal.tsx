import { useModalStore } from '@/store/modal.store';
import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const CreateModal = () => {
  const router = useRouter();
  const { setOpen } = useModalStore();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-[9999]">
      <motion.div
        transition={{
          duration: 0.1,
          delay: 0.1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <div
          ref={ref}
          className="z-50 w-[393px] bg-white absolute left-1/2 bottom-0 transform -translate-x-1/2 rounded-t-2xl">
          <div className="flex flex-col gap-6 py-8 px-4">
            <div className="text-lg font-semibold ">
              글을 등록할 게시판을 선택해주세요
            </div>
            <div
              onClick={() => {
                router.push('community/write?category=career');
                setOpen(false);
              }}
              className="flex justify-between items-center cursor-pointer">
              <div className="text-base font-medium">커리어톡</div>
              <div>
                <img src="/community/toNext.svg" alt="" />
              </div>
            </div>
            <div
              onClick={() => {
                router.push('community/write?category=interest');
                setOpen(false);
              }}
              className="flex justify-between items-center cursor-pointer">
              <div className="text-base font-medium">관심톡</div>
              <div>
                <img src="/community/toNext.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateModal;
