import React, { Dispatch } from 'react';
import { writePostType } from '../mock/writePostType';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { tagWithInterest } from '@/constant/TagWithInterest';

interface WritePostInterestTagType {
  postData: Partial<writePostType>;
  setPostData: Dispatch<React.SetStateAction<Partial<writePostType>>>;
}

const WritePostInterestTag = ({ postData, setPostData }: WritePostInterestTagType) => {
  return (
    <div className="py-3 flex flex-col gap-4">
      <div className="text-lg font-bold text-gray-900">태그</div>
      <div>
        <Swiper slidesPerView="auto" spaceBetween={8} className="mySwiper">
          {tagWithInterest.map((item, i) => (
            <SwiperSlide className="max-w-max" key={i}>
              <div
                onClick={() => {
                  setPostData((prev) => ({
                    ...prev,
                    tag: item.title
                  }));
                }}
                className={`text-sm cursor-pointer w-max h-[33px] py-2 px-4 border rounded-2xl flex justify-center items-center
    ${postData.tag === item.title ? ' bg-gray-700 text-gray-100' : ' bg-gray-100 text-gray-700'}
    `}>
                <span>{item.title}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WritePostInterestTag;
