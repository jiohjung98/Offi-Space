import React, { Dispatch } from 'react';

interface SelectRoomTypeInterface {
  currentRoom: string;
  setCurrentRoom: Dispatch<React.SetStateAction<string>>;
}

const ChangeRoomType = ({ currentRoom, setCurrentRoom }: SelectRoomTypeInterface) => {
  return (
    <div className="flex items-center mx-4">
      <div
        onClick={() => setCurrentRoom('meeting')}
        className={`
        ${currentRoom == 'meeting' ? 'border-b-[3px] border-space-purple text-space-purple font-extrabold' : 'font-semibold text-gray-800'}
        cursor-pointer w-30 flex items-center justify-center flex-1 flex-nowrap  text-base  py-[6px]`}>
        미팅룸
      </div>
      <div
        onClick={() => setCurrentRoom('recharging')}
        className={`
        ${currentRoom == 'recharging' ? 'border-b-[3px] border-space-purple text-space-purple font-extrabold' : 'font-semibold text-gray-800'}
        cursor-pointer w-30 flex items-center justify-center flex-1 flex-nowrap  text-base  py-[6px]`}>
        리차징룸
      </div>
      <div
        onClick={() => setCurrentRoom('focus')}
        className={`
        ${currentRoom == 'focus' ? 'border-b-[3px] border-space-purple text-space-purple font-extrabold' : 'font-semibold text-gray-800'}
        cursor-pointer w-30 flex items-center justify-center flex-1 flex-nowrap  text-base  py-[6px]`}>
        포커스존
      </div>
    </div>
  );
};

export default ChangeRoomType;
