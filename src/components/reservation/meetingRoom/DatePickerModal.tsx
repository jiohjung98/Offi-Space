/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DatePickerWheel from './WheelPicker';

interface DatePickerModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onConfirm: (
    startDate: Date,
    endDate: Date,
    options: {
      meetingRoomTypes: ('MINI' | 'STANDARD' | 'MEDIUM' | 'STATE')[];
      projectorExists: boolean;
      canVideoConference: boolean;
      isPrivate: boolean;
    }
  ) => void;
  initialStartTime: Date;
  initialEndTime: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ showModal, setShowModal, onConfirm, initialStartTime, initialEndTime }) => {
  const [startDate, setStartDate] = useState<Date>(initialStartTime);
  const [startTime, setStartTime] = useState<string>(initialStartTime.toTimeString().substr(0, 5));
  const [endTime, setEndTime] = useState<string>(initialEndTime.toTimeString().substr(0, 5));
  const [minStartTime, setMinStartTime] = useState<string>('00:00');
  const [selectedMeetingRoomTypes, setSelectedMeetingRoomTypes] = useState<('MINI' | 'STANDARD' | 'MEDIUM' | 'STATE')[]>([]);
  const [projectorExists, setProjectorExists] = useState<boolean>(false);
  const [canVideoConference, setCanVideoConference] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

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

    onConfirm(startDateTime, endDateTime, { meetingRoomTypes: selectedMeetingRoomTypes.length === 0 ? ['MINI', 'STANDARD', 'MEDIUM', 'STATE'] : selectedMeetingRoomTypes, projectorExists, canVideoConference, isPrivate });
    setShowModal(false);
  };

  const handleTypeChange = (type: 'MINI' | 'STANDARD' | 'MEDIUM' | 'STATE') => {
    setSelectedMeetingRoomTypes((prevTypes) => 
      prevTypes.includes(type) 
        ? prevTypes.filter((t) => t !== type) 
        : [...prevTypes, type]
    );
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
    // setSelectedMeetingRoomTypes([]);
    // setProjectorExists(false);
    // setCanVideoConference(false);
    // setIsPrivate(false);
  
    // setEndTime(startTime);

    // const formattedStartTime = `${String(initialStartTime.getHours()).padStart(2, '0')}:${String(initialStartTime.getMinutes()).padStart(2, '0')}`;
    // const formattedEndTime = `${String(initialEndTime.getHours()).padStart(2, '0')}:${String(initialEndTime.getMinutes()).padStart(2, '0')}`;
  
    // setMinStartTime(formattedStartTime); 
    // setStartTime(formattedStartTime); 
    // setEndTime(formattedEndTime); 
    setShowModal(false)
  };
  
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-[9999]">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-t-2xl w-[full] h-[750px] p-6 absolute bottom-0 overflow-y-auto">
        <div className="flex">
        <div className='absolute'>
          <h2 className="text-lg font-semibold relative z-[9999] ml-[5px]">일정</h2>
        </div>
          <div className='flex mx-auto justify-center items-center'>
            <div className="text-indigo-700 text-lg font-bold font-['Pretendard'] justify-center items-center">{`${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')} ${startTime.replace(':', '.')} ~ ${endTime.replace(':', '.')}`}</div>
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
        <div className="mb-2">
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
        <div className="mb-4">
          <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard'] mb-[5px]">인원</div>
          <div className="grid grid-cols-2 gap-2">
            {(['MINI', 'STANDARD', 'MEDIUM', 'STATE'] as const).map((type) => (
                <label key={type} className="flex items-center">
                    <input
                        type="checkbox"
                        id="check1"
                        checked={selectedMeetingRoomTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className={`appearance-none border-none w-6 h-6 rounded ${
                            selectedMeetingRoomTypes.includes(type) 
                            ? 'bg-violet-100' 
                            : 'bg-zinc-100'
                        }`}
                    />
                    <span className="ml-[5px] text-black/opacity-20 text-base font-medium font-['Pretendard']">
                        {type === 'MINI' ? '미니(1-4인)' : type === 'STANDARD' ? '스탠다드(5-8인)' : type === 'MEDIUM' ? '미디움(9-12인)' : type === 'STATE' ? '스테이트(13-15인)' : type}
                    </span>
                </label>
            ))}
        </div>
        </div>
        <div className="">
          <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard'] mb-[5px]">비품</div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={projectorExists}
                    onChange={() => setProjectorExists((prev) => !prev)}
                />
                <span className="ml-[5px] text-black/opacity-20 text-base font-medium font-['Pretendard']">프로젝터</span>
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={canVideoConference}
                    onChange={() => setCanVideoConference((prev) => !prev)}
                />
                <span className="ml-[5px] text-black/opacity-20 text-base font-medium font-['Pretendard']">화상장비</span>
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={() => setIsPrivate((prev) => !prev)}
                />
                <span className="ml-[5px] text-black/opacity-20 text-base font-medium font-['Pretendard']">프라이빗</span>
            </label>
        </div>
        </div>
        <div className="flex justify-between pt-[20px]">
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

export default DatePickerModal;
