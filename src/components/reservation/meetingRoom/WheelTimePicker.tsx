/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

interface WheelTimePickerProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const WheelTimePicker: React.FC<WheelTimePickerProps> = ({ startTime, endTime, onStartTimeChange, onEndTimeChange }) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>, type: 'start' | 'end') => {
    e.preventDefault();
    const { clientY } = e.touches[0];
    if (touchStartY !== null) {
      const deltaY = clientY - touchStartY;
      const time = type === 'start' ? startTime : endTime;
      const newTime = deltaY > 0 ? addMinutes(time, 30) : subtractMinutes(time, 30);
      type === 'start' ? onStartTimeChange(newTime) : onEndTimeChange(newTime);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
  };

  const addMinutes = (time: string, minutes: number) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins + minutes);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const subtractMinutes = (time: string, minutes: number) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins - minutes);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <>
      <div 
        className="wheel-time-picker" 
        onTouchStart={(e) => handleTouchStart(e)} 
        onTouchMove={(e) => handleTouchMove(e, 'start')} 
        onTouchEnd={handleTouchEnd} 
        onTouchCancel={handleTouchEnd}
      >
        {startTime}
      </div>
      <span>~</span>
      <div 
        className="wheel-time-picker" 
        onTouchStart={(e) => handleTouchStart(e)} 
        onTouchMove={(e) => handleTouchMove(e, 'end')} 
        onTouchEnd={handleTouchEnd} 
        onTouchCancel={handleTouchEnd}
      >
        {endTime}
      </div>
    </>
  );
};

export default WheelTimePicker;
