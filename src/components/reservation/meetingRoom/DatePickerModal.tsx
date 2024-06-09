/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerWheel from './WheelPicker';
import { ko } from 'date-fns/locale';

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

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  showModal,
  setShowModal,
  onConfirm,
  initialStartTime,
  initialEndTime
}) => {
  const [startDate, setStartDate] = useState<Date>(initialStartTime);
  const [startTime, setStartTime] = useState<string>(
    initialStartTime.toTimeString().substr(0, 5)
  );
  const [endTime, setEndTime] = useState<string>(
    initialEndTime.toTimeString().substr(0, 5)
  );
  const [minStartTime, setMinStartTime] = useState<string>('00:00');
  const [selectedMeetingRoomTypes, setSelectedMeetingRoomTypes] = useState<
    ('MINI' | 'STANDARD' | 'MEDIUM' | 'STATE')[]
  >([]);
  const [projectorExists, setProjectorExists] = useState<boolean>(false);
  const [canVideoConference, setCanVideoConference] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('schedule');

  useEffect(() => {
    if (startDate.toDateString() === new Date().toDateString()) {
      const now = new Date();
      const currentMinutes = now.getMinutes();
      const roundedMinutes = currentMinutes > 30 ? 0 : 30;
      const currentHour = currentMinutes > 30 ? now.getHours() + 1 : now.getHours();
      const formattedTime = `${String(currentHour).padStart(2, '0')}:${String(
        roundedMinutes
      ).padStart(2, '0')}`;
      setMinStartTime(formattedTime);
      if (formattedTime > startTime) {
        setStartTime(formattedTime);
        setEndTime(add60Minutes(formattedTime));
      }
    } else {
      setMinStartTime('00:00');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const add60Minutes = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + 60);
    return `${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`;
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

    onConfirm(startDateTime, endDateTime, {
      meetingRoomTypes:
        selectedMeetingRoomTypes.length === 0
          ? ['MINI', 'STANDARD', 'MEDIUM', 'STATE']
          : selectedMeetingRoomTypes,
      projectorExists,
      canVideoConference,
      isPrivate
    });
    setShowModal(false);
    setActiveTab('schedule');
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
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(
        2,
        '0'
      )}`;
      if (timeString >= minStartTime) {
        startTimeOptions.push(timeString);
      }
    }
  }

  for (let hour = 0; hour <= 24; hour++) {
    for (const minute of [0, 30]) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(
        2,
        '0'
      )}`;
      if (timeString > startTime && timeString <= '24:00') {
        endTimeOptions.push(timeString);
      }
    }
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-[99999]">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-t-2xl w-[100%] max-w-[430px] h-[640px] p-6 absolute bottom-0 overflow-y-auto">
        <div className="flex">
          <button
            className={`py-2 px-4 ${
              activeTab === 'schedule'
                ? "text-black/opacity-20 text-lg font-bold font-['Pretendard']"
                : "text-neutral-600 text-lg font-normal font-['Pretendard']"
            }`}
            onClick={() => setActiveTab('schedule')}>
            일정
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'people'
                ? "text-black/opacity-20 text-lg font-bold font-['Pretendard']"
                : "text-neutral-600 text-lg font-normal font-['Pretendard']"
            }`}
            onClick={() => setActiveTab('people')}>
            인원
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'equipment'
                ? "text-black/opacity-20 text-lg font-bold font-['Pretendard']"
                : "text-neutral-600 text-lg font-normal font-['Pretendard']"
            }`}
            onClick={() => setActiveTab('equipment')}>
            비품
          </button>
        </div>

        {activeTab === 'schedule' && (
          <>
            <div className="">
              <div className="w-full">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date || new Date())}
                  dateFormat="yyyy.MM.dd"
                  inline
                  className="mx-auto"
                  minDate={new Date()}
                  locale={ko}
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                  }) => (
                    <div className="w-full text-center">
                      <div className="flex mx-auto items-center justify-center px-2 py-1">
                        <button
                          className="mr-[15px]"
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}>
                          {prevMonthButtonDisabled ? (
                            <img src="leftArrow.svg" alt="Left Arrow" />
                          ) : (
                            <img src="leftDisableArrow.svg" alt="Disabled Left Arrow" />
                          )}
                        </button>
                        <div className="text-black/opacity-20 text-base font-semibold leading-normal">
                          {date.getFullYear()}.{' '}
                          {String(date.getMonth() + 1).padStart(2, '0')}
                        </div>
                        <button
                          className="ml-[15px]"
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}>
                          <img src="rightArrow.svg" alt="Right Arrow" />
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="mb-[50px]">
              <div className="flex items-center w-[100%]">
                <DatePickerWheel
                  items={startTimeOptions.map((time) => ({ value: time, label: time }))}
                  value={startTime}
                  onChange={setStartTime}
                />
                <span
                  className="h-[50px] w-[20%] text-center my-auto leading-[50px]"
                  style={{ backgroundColor: 'rgba(237, 235, 248, 0.85)' }}>
                  부터
                </span>
                <DatePickerWheel
                  items={endTimeOptions.map((time) => ({ value: time, label: time }))}
                  value={endTime}
                  onChange={setEndTime}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'people' && (
          <div className="mt-4 w-[100%]">
            <div className="flex flex-col">
              {(['MINI', 'STANDARD', 'MEDIUM', 'STATE'] as const).map((type) => (
                <label key={type} className="flex items-center my-[12px]">
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
                  <span className="ml-[8px] text-black/opacity-20 text-base font-medium font-['Pretendard']">
                    {type === 'MINI'
                      ? '미니(1-4인)'
                      : type === 'STANDARD'
                        ? '스탠다드(5-8인)'
                        : type === 'MEDIUM'
                          ? '미디움(9-12인)'
                          : type === 'STATE'
                            ? '스테이트(13-15인)'
                            : type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'equipment' && (
          <div className="">
            <div className="mt-4 flex flex-col">
              <label className="flex items-center my-[12px]">
                <input
                  type="checkbox"
                  checked={projectorExists}
                  onChange={() => setProjectorExists((prev) => !prev)}
                />
                <span className="ml-[8px] text-black/opacity-20 text-base font-medium font-['Pretendard']">
                  프로젝터
                </span>
              </label>
              <label className="flex items-center my-[12px]">
                <input
                  type="checkbox"
                  checked={canVideoConference}
                  onChange={() => setCanVideoConference((prev) => !prev)}
                />
                <span className="ml-[8px] text-black/opacity-20 text-base font-medium font-['Pretendard']">
                  화상장비
                </span>
              </label>
              <label className="flex items-center my-[12px]">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={() => setIsPrivate((prev) => !prev)}
                />
                <span className="ml-[8px] text-black/opacity-20 text-base font-medium font-['Pretendard']">
                  프라이빗
                </span>
              </label>
            </div>
          </div>
        )}
        <div className="pt-[10px] w-full text-center items-center">
          <button
            className="absolute bottom-[30px] flex w-[88%] mx-auto h-12 bg-indigo-700 text-white rounded-lg justify-center items-center"
            onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
