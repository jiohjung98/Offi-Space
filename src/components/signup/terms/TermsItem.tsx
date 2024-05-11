import React, { Dispatch, MouseEvent } from 'react';

interface TermsItemProps {
  title: string;
  description: string;
  subTitle: string;
  checked: boolean;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  setModalDescription: Dispatch<React.SetStateAction<string | null>>;
  setModalSubTitle: Dispatch<React.SetStateAction<string | null>>;
}

const TermsItem = ({
  title,
  description,
  checked,
  subTitle,
  setModalSubTitle,
  onChange,
  setOpenModal,
  setModalDescription
}: TermsItemProps) => {
  const handleClick = () => {
    setModalDescription(description);
    setModalSubTitle(subTitle);
    setOpenModal(true);
  };

  return (
    <li className="w-[328px] h-[21px] justify-between items-center inline-flex cursor-pointer">
      <div
        onClick={(e) => {
          onChange(e, !checked);
        }}
        className="justify-start items-center gap-[11px] flex cursor-pointer">
        <div className="w-3 h-2.5 relative">
          {checked ? (
            <img src="/sign/termsCheck.png" alt="" />
          ) : (
            <img src="/sign/termsNotCheck.png" alt="" />
          )}
        </div>
        <div className="text-gray-700 text-sm font-normal font-pretendard leading-[21px]">
          {title}
        </div>
      </div>
      <img
        src="/sign/termsDetail.png"
        alt=""
        onClick={handleClick}
        className="cursor-pointer"
      />
    </li>
  );
};

export default TermsItem;
