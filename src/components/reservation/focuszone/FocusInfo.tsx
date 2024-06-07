import React from 'react';
import { motion } from 'framer-motion';

const FocusInfo = () => {
  return (
    <>
      <div className="mt-[33px] mx-4">
        <motion.div
          initial={{
            opacity: 0,
            translateX: -90
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
            delay: 0.1
          }}>
          <div className="flex items-center gap-[9px]">
            <div>
              <img src="reservation/focus_check.svg" alt="" />
            </div>
            <div className="text-space-black font-bold text-base">이럴 때 좋아요!</div>
          </div>
        </motion.div>

        <div className="mt-[22px] mx-[12px]">
          <motion.div
            initial={{
              opacity: 0,
              translateX: -90
            }}
            animate={{
              opacity: 1,
              translateX: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
              delay: 0.2
            }}>
            <div className="text-gray-800 text-sm font-semibold">
              · 업무에 집중이 필요해요.
            </div>
            <div className="mt-1 text-gray-600 text-sm font-normal mx-2">
              포커스존의 모든 좌석에는 파티션이 있어서 단독 좌석으로 활용할 수 있어요.
              더욱 집중하기 좋은 좌석이에요.
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              translateX: -90
            }}
            animate={{
              opacity: 1,
              translateX: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
              delay: 0.3
            }}>
            <div className="text-gray-800 text-sm font-semibold mt-[28px]">
              · 공용 공간보단 개인 공간에서 일하고 싶어요.
            </div>
            <div className="mt-1 text-gray-600 text-sm font-normal mx-2 pb-[29px]">
              일이 잘되는 나만의 공간을 찾고 싶을 때 이용하면 좋아요.
            </div>
          </motion.div>
        </div>
      </div>
      <div className="h-[2px] bg-gray-100 mx-4" />

      <motion.div
        initial={{
          opacity: 0,
          translateX: -90
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          delay: 0.4
        }}>
        <div className="mt-[33px] mx-4">
          <div className="flex items-center gap-[9px]">
            <div>
              <img src="reservation/focus_check.svg" alt="" />
            </div>
            <div className="text-space-black font-bold text-base">지켜주세요!</div>
          </div>
          <div className="mt-[22px] mx-[12px]">
            <div className="text-gray-800 text-sm font-semibold">
              · 음식 섭취는 곤란해요.
            </div>
            <div className="mt-1 text-gray-600 text-sm font-normal mx-2">
              포커스존 내에서는 음료 섭취만 가능합니다. 음식물을 섭취하실 때는 지정된
              곳에서만 이용해주세요.
            </div>
            <div className="text-gray-800 text-sm font-semibold mt-[28px]">
              · 뒷정리 후 종료버튼을 눌러주세요.
            </div>
            <div className="mt-1 text-gray-600 text-sm font-normal mx-2 pb-[29px]">
              포커스존은 이용 예약 후 사용이 가능하며, 다음 이용자를 위해 뒷정리 후 이용
              종료 버튼을 꼭 눌러주세요.
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FocusInfo;
