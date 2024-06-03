/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
  const [minStartTime, setMinStartTime] = useState<string>('09:00');
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
      setMinStartTime('09:00');
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

  for (let hour = 9; hour <= 23; hour++) {
    for (const minute of [0, 30]) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      if (timeString >= minStartTime) {
        startTimeOptions.push(timeString);
      }
    }
  }

  for (let hour = 9; hour <= 24; hour++) {
    for (const minute of [0, 30]) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      if (timeString > startTime) {
        endTimeOptions.push(timeString);
      }
    }
  }

  if (!showModal) return null;
  return (
    <div className="fixed inset-0 flex items-end justify-center z-[9999]">
    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
    <div className="bg-white rounded-lg w-[full] h-[676px] p-6 absolute bottom-0 overflow-y-auto">
    <div className="mb-4 flex">
      <h2 className="text-lg font-semibold">일정</h2>
      <div className='flex w-[294px] justify-center items-center'>
        <div className="text-indigo-700 text-lg font-bold font-['Pretendard'] justify-center items-center">{`${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')} ${startTime.replace(':', '.')} ~ ${endTime.replace(':', '.')}`}</div>
      </div>
    </div>
      <div className="mb-4">
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
          <label className="block mb-2">시간 선택</label>
          <div className="flex items-center space-x-2">
            <select className="border rounded p-2" value={startTime} onChange={e => setStartTime(e.target.value)}>
              {startTimeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <span>~</span>
            <select className="border rounded p-2" value={endTime} onChange={e => setEndTime(e.target.value)}>
              {endTimeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard'] mb-[15px]">인원</div>
          <div className="flex flex-col">
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
                > 
                </input>
                <span className="ml-[5px] text-black/opacity-20 text-base font-medium font-['Pretendard']">{type === 'MINI' ? '미니(1-4인)' : type === 'STANDARD' ? '스탠다드(5-8인)': type === 'MEDIUM' ? '미디움(9-12인)' : type === 'STATE' ? '스테이트(13-15인)' : type}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard'] mb-[15px]">비품</div>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={projectorExists}
                onChange={() => setProjectorExists((prev) => !prev)}
              />
              <span className="ml-2">프로젝터</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={canVideoConference}
                onChange={() => setCanVideoConference((prev) => !prev)}
              />
              <span className="ml-2">화상장비</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={() => setIsPrivate((prev) => !prev)}
              />
              <span className="ml-2">프라이빗</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleConfirm}>확인</button>
          <button className="bg-gray-300 rounded px-4 py-2" onClick={() => setShowModal(false)}>취소</button>
        </div>
      </div>
    </div>
  );
}  
export default DatePickerModal;

