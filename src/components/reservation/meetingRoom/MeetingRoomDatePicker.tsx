/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DatePickerWheel from './WheelPicker';

interface MeetingRoomDatePickerModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onConfirm: (
    startDate: Date,
    endDate: Date,
  ) => void;
  initialStartTime: Date;
  initialEndTime: Date;
}

const MeetingRoomDatePickerModal: React.FC<MeetingRoomDatePickerModalProps> = ({ showModal, setShowModal, onConfirm, initialStartTime, initialEndTime }) => {
  const [startDate, setStartDate] = useState<Date>(initialStartTime);
  const [startTime, setStartTime] = useState<string>(initialStartTime.toTimeString().substr(0, 5));
  const [endTime, setEndTime] = useState<string>(initialEndTime.toTimeString().substr(0, 5));
  const [minStartTime, setMinStartTime] = useState<string>('00:00');
  
  useEffect(() => {
    if (startDate.toDateString() === new Date().toDateString()) {
      const now = new Date();
      const currentMinutes = now.getMinutes();
      const roundedMinutes = currentMinutes > 30 ? 0 : 30;
      const currentHour = currentMinutes > 30 ? now.getHours() + 1 : now.getHours();
      const formattedTime = `${String(currentHour).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`;
      setMinStartTime(formattedTime);
      if (formattedTime > startTime) {
        setStartTime(formattedTime);
        setEndTime(add60Minutes(formattedTime));
      }
    } else {
      setMinStartTime('00:00');
    }
  }, [startDate]);

  const add60Minutes = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + 60);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDateTime = new Date(startDate);
    startDateTime.setHours(startHour);
    startDateTime.setMinutes(startMinute);

    const endDateTime = new Date(startDate);
    endDateTime.setHours(endHour);
    endDateTime.setMinutes(endMinute);

    onConfirm(startDateTime, endDateTime);
    setShowModal(false);
  };

  const startTimeOptions = [];
  const endTimeOptions = [];

  for (let hour = 0; hour <= 23; hour++) {
    for (const minute of [0, 30]) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      if (timeString >= minStartTime) {
        startTimeOptions.push(timeString);
      }
    }
  }

  for (let hour = 0; hour <= 24; hour++) {
    for (const minute of [0, 30]) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      if (timeString > startTime && timeString <= '24:00') {
        endTimeOptions.push(timeString);
      }
    }
  }

  const resetFilters = () => {
    setShowModal(false)
  };
  
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-[9999]">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg h-[630px] p-6 absolute bottom-0">
        <div className="flex">
          <div className='absolute'>
        <h2 className="text-lg font-semibold relative z-[9999] ml-[5px]">일정</h2>
        </div>
          <div className='flex mx-auto justify-center items-center'>
            <div className="text-indigo-700 text-lg font-bold font-['Pretendard'] justify-center items-center z-[9999] mt-[1px]">{`${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')} ${startTime.replace(':', '.')} ~ ${endTime.replace(':', '.')}`}</div>
          </div>
        </div>
        <div className="">
          <div className='w-full'>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date || new Date())}
              dateFormat="yyyy.MM.dd"
              inline
              className="mx-auto"
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center w-full">
            <DatePickerWheel
              items={startTimeOptions.map(time => ({ value: time, label: time }))}
              value={startTime}
              onChange={setStartTime}
            />
            <span className='h-[50px] my-auto leading-[50px]' style={{ backgroundColor: 'rgba(237, 235, 248, 0.85)' }}>부터</span>
            <DatePickerWheel
              items={endTimeOptions.map(time => ({ value: time, label: time }))}
              value={endTime}
              onChange={setEndTime}
            />
          </div>
        </div>
        <div className="flex justify-between pt-[25px]">
          <div className='flex w-[150px] h-[36px] bg-[#EDEBF8] rounded-md justify-center items-center cursor-pointer' onClick={resetFilters}>
            <div 
              className="text-[#3B268C] py-[6px] justify-center items-center gap-2"
            >
              취소
            </div>
          </div>
          <button 
            className="flex w-[150px] h-[36px] text-[#3B268C] px-[6px] py-[6px] rounded-md justify-center items-center border border-[#3E2896] mr-[20px]"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}  

export default MeetingRoomDatePickerModal;
