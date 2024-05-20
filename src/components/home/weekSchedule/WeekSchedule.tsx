import React from 'react';

const WeekSchedule = () => {
  return (
    <div className="py-10 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold  text-gray-800">이번 주 일정</div>
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <div className="text-gray-500 text-sm font-normal ">전체보기</div>
          <img src="/home/toNext_gray.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default WeekSchedule;
