/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { OfficeInfoProps } from '@/api/types/branch';
import { subwayLineColors, subwayLineAbbreviations } from '@/constant/station';
import BranchOffice from './BranchOffice';

const BranchInfo: React.FC<OfficeInfoProps> = ({ branchName }) => {
  const router = useRouter();

  const address = router.query.address as string;
  const branchPhoneNumber = router.query.branchPhoneNumber as string;
  const roadFromStation = router.query.roadFromStation as string;
  const stationToBranch = router.query.stationToBranch as string;

  useEffect(() => {
    if (address && branchPhoneNumber && roadFromStation && stationToBranch) {
      localStorage.setItem('branchInfo', JSON.stringify({
        branchName,
        address,
        branchPhoneNumber,
        roadFromStation,
        stationToBranch
      }));
    }
  }, [address, branchPhoneNumber, roadFromStation, stationToBranch]);

  useEffect(() => {
    if (!address || !branchPhoneNumber || !roadFromStation || !stationToBranch) {
      const savedBranchInfo = localStorage.getItem('branchInfo');
      if (savedBranchInfo) {
        const { branchName, address, branchPhoneNumber, roadFromStation, stationToBranch } = JSON.parse(savedBranchInfo);
        router.replace({
          pathname: router.pathname,
          query: {
            name: branchName,
            address,
            branchPhoneNumber,
            roadFromStation,
            stationToBranch
          }
        }, undefined, { shallow: true });
      }
    }
  }, []);

  const handleBackClick = () => {
    router.push('/map');
  };


  return (
    <section className="w-full h-full">
      <header className="top-0 left-0 right-0 bg-white z-50 shadow-md py-4 flex items-center">
        <IoIosArrowRoundBack size={40} className="ml-[6px]" onClick={handleBackClick} />
        <span className="text-lg font-semibold ml-[8px]">
          {branchName}
        </span>
      </header>
      <div className="">
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={8}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          <SwiperSlide className="flex justify-center items-center h-full">
            <Image src="/map/OfficeDefaultImg2.png" alt="Office Image 1" width={500} height={246} className="h-[246px] object-cover" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center h-full">
            <Image src="/map/OfficeDefaultImg2.png" alt="Office Image 2" width={500} height={246} className="h-[246px] object-cover" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center h-full">
            <Image src="/map/OfficeDefaultImg2.png" alt="Office Image 3" width={500} height={246} className="h-[246px] object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      <article className="">
        <div className='p-4'>
          <div className="text-black/opacity-20 text-lg font-extrabold py-[10px]">찾아오는길</div>
          <div className='flex py-[10px]'>
            <Image src="/map/OfficeLocationSmall1.svg" className='mb-auto pt-[3px]' alt="OfficeLocationSmall" width={12} height={16} />
            <div className='flex flex-col'>
              <p className="text-sm text-gray-600 ml-[8px] mb-[5px]">{address}</p>
              <div className='flex ml-[8px] space-x-[4px] items-center'>
                {stationToBranch && stationToBranch.split(',').map((line) => {
                  const trimmedLine = line.trim();
                  const abbreviation = subwayLineAbbreviations[trimmedLine] || trimmedLine;
                  return (
                    <div
                      key={trimmedLine}
                      className="w-[16px] h-[16px] flex items-center justify-center rounded-full text-white font-bold"
                      style={{ backgroundColor: subwayLineColors[trimmedLine], fontSize: '12px' }}
                    >
                      {abbreviation}
                    </div>
                  );
                })}
                <p className="text-sm text-gray-600 ml-[8px]">{roadFromStation}</p>
              </div>
            </div>
          </div>
          <div className='flex py-[10px]'>
            <Image src="/map/OfficeCallImg.svg" className='mb-auto pt-[3px]' alt="OfficeCallImg" width={12} height={16} />
            <p className="text-sm text-gray-600 ml-[8px]">{branchPhoneNumber}</p>
          </div>
          <div className='flex py-[10px]'>
            <Image src="/map/OfficeParkImg.svg" className='mb-auto pt-[3px]' alt="OfficeParkImg" width={12} height={16} />
            <p className="text-sm text-gray-600 ml-[8px]">출차 전 2층 데스크에서 1시간 무료 적용,<br/>이후 10분당 800원 비용 발생</p>
          </div> 
        </div>
        <div className="w-full h-1 bg-neutral-200" />
        <div className="px-4 py-6">
          <div className="text-black/opacity-20 text-lg font-extrabold py-[10px]">공용 공간 리스트</div>
        </div>
        <div className="w-full h-px bg-neutral-200" />
        <div className="px-4 py-6">
          <div className="text-black/opacity-20 text-lg font-extrabold py-[10px]">편의시설</div>
          <div className="grid grid-cols-4 gap-4 py-[10px]">
            <div className="flex flex-col items-center">
              <Image src="/map/LoungeImg.svg" alt="LoungeImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">라운지</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/map/RechargeImg.svg" alt="RechargeImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">리차징룸</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/map/ParcelImg.svg" alt="ParcelImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">무인택배</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/map/PhoneBooseImg.svg" alt="PhoneBooseImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">폰부스</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/map/PrinterImg.svg" alt="PrinterImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">복합기</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/map/SnackBarImg.svg" alt="SnackBarImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">스낵바</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/map/SuppliesImg.svg" alt="SuppliesImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">사무용품</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/map/CoffeeImg.svg" alt="CoffeeImg" width={12} height={16} className="w-[40px] h-[40px] my-auto"/>
              <p className="mt-2">무제한 커피</p>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-neutral-200" />
        <div className="px-4 py-6">
          <div className="text-black/opacity-20 text-lg font-extrabold">공지사항</div>
        </div>
        <BranchOffice branchName={branchName}/>
        <footer className='w-full text-center py-[30px]'>
          <button className='w-[361px] h-12 bg-indigo-700 rounded-lg border border-indigo-700 text-center text-stone-50 text-[15px] font-semibold'>예약하기</button>
        </footer>
      </article>
    </section>
  );
};

export default BranchInfo;
