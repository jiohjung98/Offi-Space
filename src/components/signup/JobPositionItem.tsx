import React from 'react';

interface JobPositionItemProps {
  title: string;
  handleClick: (title: string) => void;
  selectPosition: string | null;
}

const JobPositionItem = ({
  title,
  handleClick,
  selectPosition
}: JobPositionItemProps) => {
  return (
    <div className="mt-[17px] cursor-pointer" onClick={() => handleClick(title)}>
      <div className="w-[361px] h-9 pb-4 border-b border-neutral-200 justify-between items-center inline-flex">
        <div className="text-neutral-700 text-sm font-normal font-['Pretendard']">
          {title}
        </div>
        <div className="w-5 h-5 relative">
          {title == selectPosition ? (
            <img src="/sign/positionColorCircle.png" alt="" />
          ) : (
            <img src="/sign/positionCircle.png" alt="" />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPositionItem;
