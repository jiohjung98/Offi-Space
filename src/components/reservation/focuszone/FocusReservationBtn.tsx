import { useRouter } from 'next/router';
import React from 'react';

const FocusReservationBtn = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/reservation/selectseat')}
      className=" mx-4 mt-2 cursor-pointer bg-space-purple py-3 flex justify-center rounded-xl text-white font-bold text-[15px] ">
      바로 예약
    </div>
  );
};

export default FocusReservationBtn;
