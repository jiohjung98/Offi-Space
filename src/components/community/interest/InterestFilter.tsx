import { interestTag } from '@/constant/interestTag';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import InterestFilterItem from './InterestFilterItem';

export default function InterestFilter() {
  return (
    <div className="w-[361px] mx-[16px] mt-[32px] h-[48px] overflow-hidden">
      <Swiper slidesPerView="auto" spaceBetween={8} className="mySwiper">
        {interestTag.map((item, i) => (
          <SwiperSlide className="max-w-max" key={i}>
            <InterestFilterItem title={item.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
