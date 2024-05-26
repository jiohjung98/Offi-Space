import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

interface OfficeInfoProps {
  branchName: string;
  branchAddress: string;
}

const OfficeInfo: React.FC<OfficeInfoProps> = ({ branchName, branchAddress }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/map');
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 right-0 bg-white z-50 shadow-md p-4 flex items-center justify-between">
        <button onClick={handleBackClick} className="text-lg font-bold">뒤로</button>
        <span className="text-lg font-semibold">{branchName}</span>
        <div></div>
      </div>
      <div className="pt-16">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <Image src="/OfficeDefaultImg.png" alt="Office Image 1" width={500} height={300} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/OfficeDefaultImg.png" alt="Office Image 2" width={500} height={300} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/OfficeDefaultImg.png" alt="Office Image 3" width={500} height={300} />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{branchName}</h2>
        <p className="text-sm text-gray-600">{branchAddress}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">편의시설</h3>
          <ul className="list-disc pl-5">
            <li>라운지</li>
            <li>리차징룸</li>
            <li>무인택배</li>
            <li>폰부스</li>
            <li>복합기</li>
            <li>무인 스낵바</li>
            <li>사무용품</li>
            <li>무제한 커피</li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">공용 공간 리스트</h3>
          <ul>
            <li>A룸 - 10명 수용 가능</li>
            <li>B룸 - 9명 수용 가능</li>
            <li>C룸 - 13명 수용 가능</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OfficeInfo;
