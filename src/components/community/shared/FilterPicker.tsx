import React, { Dispatch, useState } from 'react';

interface FilterPicker {
  filterPicker: string;
  setFilterPicker: Dispatch<React.SetStateAction<string>>;
}

const FilterPicker = ({ filterPicker, setFilterPicker }: FilterPicker) => {
  const [showBox, setShowBox] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowBox((prev) => !prev)}
        className="mt-[32px] flex flex-row-reverse relative">
        <div className="flex justify-center items-center gap-4 cursor-pointer text-sm font-semibold">
          <div>{filterPicker}</div>
          <div>
            {showBox ? (
              <img src="/community/toTop.png" alt="" />
            ) : (
              <img src="/community/toBottom.png" alt="" />
            )}
          </div>
        </div>
      </div>
      {showBox ? (
        <div className="flex flex-row-reverse absolute z-1000 bottom-[33px] right-[290px]">
          <div className="w-[180px] text-sm bg-white">
            <div
              onClick={() => {
                setFilterPicker('최신순');
                setShowBox(false);
              }}
              className="flex items-center border-b border-neutral-300 h-[45px] cursor-pointer">
              최신순
              {filterPicker === '최신순' ? (
                <img src="/community/check.png" alt="" className="ml-[11px]" />
              ) : (
                ''
              )}
            </div>
            <div
              onClick={() => {
                setFilterPicker('인기순');
                setShowBox(false);
              }}
              className="flex items-center  border-b border-neutral-300 h-[45px] py-[11px] cursor-pointer">
              인기순
              {filterPicker === '인기순' ? (
                <img src="/community/check.png" alt="" className="ml-[11px]" />
              ) : (
                ''
              )}
            </div>
            <div
              onClick={() => {
                setFilterPicker('조회순');
                setShowBox(false);
              }}
              className="flex items-center  h-[45px] py-[11px] cursor-pointer">
              조회순
              {filterPicker === '조회순' ? (
                <img src="/community/check.png" alt="" className="ml-[11px]" />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterPicker;
