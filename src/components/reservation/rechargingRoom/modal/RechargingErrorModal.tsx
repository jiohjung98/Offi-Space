import React, { Dispatch, useEffect } from 'react';

interface RechargingErrorModalType {
  errorModal: string;
  setErrorModal: Dispatch<React.SetStateAction<string>>;
}

const RechargingErrorModal = ({
  errorModal,
  setErrorModal
}: RechargingErrorModalType) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorModal('');
    }, 5000);
  }, [errorModal, setErrorModal]);

  return (
    <div
      onClick={() => setErrorModal('')}
      className="z-50 fixed bottom-[100px] left-1/2 transform -translate-x-1/2 w-[303px] h-[68px] opacity-90 bg-neutral-700 flex justify-center items-center gap-2 rounded-[40px] ">
      <div>
        <img src="/reservation/rechargingError.svg" alt="" />
      </div>
      <div className="text-white text-sm font-normal">
        <div>
          {errorModal === 'MEETING_ROOM_EXISTS'
            ? '해당 시간에 미팅룸 일정이 있습니다.'
            : '이미 리차징룸 예약이 있습니다.'}
        </div>
        <div>
          {errorModal === 'MEETING_ROOM_EXISTS'
            ? '다른 시간으로 예약해보세요.'
            : '시간 당 한 공간만 예약이 가능합니다.'}
        </div>
      </div>
    </div>
  );
};

export default RechargingErrorModal;
