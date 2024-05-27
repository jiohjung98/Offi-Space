import { interestTag } from '@/constant/interestTag';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import InterestFilterItem from './InterestFilterItem';
import { useEffect, useRef } from 'react';
import { useInterestTalk } from '@/store/interestTalk.store';
import { useCategoryStore } from '@/store/category.store';

export default function InterestFilter() {
  const { initialTag } = useInterestTalk();
  const { setCategory } = useCategoryStore();
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    setCategory(initialTag);
  }, [initialTag, setCategory]);

  useEffect(() => {
    if (swiperRef.current) {
      const index = interestTag.findIndex((item) => item.title === initialTag);
      if (index !== -1) {
        swiperRef.current.slideTo(index);
      }
    }
  }, [initialTag]);

  return (
    <div className="w-[361px] mx-[16px] mt-[32px] h-[48px] overflow-hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={8}
        className="mySwiper"
        onSwiper={(swiper: SwiperClass) => {
          swiperRef.current = swiper;
        }}>
        {interestTag.map((item, i) => (
          <SwiperSlide className="max-w-max" key={i}>
            <InterestFilterItem title={item.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
