/* eslint-disable no-unused-vars */
import React, { MouseEvent } from 'react';
//
interface TermsTitleProps {
  checked: boolean;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
}

const TermsTitle = ({ checked, onChange }: TermsTitleProps) => {
  return (
    <div
      onClick={(e) => onChange(e, !checked)}
      className={`cursor-pointer w-[361px] h-12 bg-white rounded-lg border-2  flex items-center
      ${
        checked
          ? 'border-space-purple text-space-purple'
          : 'text-gray-500 border-gray-400'
      }
      `}>
      <div className="w-[14px] h-[14px] ml-[17px] mr-[17px]">
        {checked ? (
          <img src="/sign/termsCheck.png" alt="" className="w-full" />
        ) : (
          <img src="/sign/termsNotCheck.png" alt="" className="w-full" />
        )}
      </div>
      <div
        className={`text-sm font-semibold font-pretendard leading-[21px]
      ${checked ? 'text-space-purple' : 'text-gray-600'}
      `}>
        모두 동의합니다
      </div>
    </div>
  );
};

export default TermsTitle;
