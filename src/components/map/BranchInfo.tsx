/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { subwayLineColors, subwayLineAbbreviations } from '@/constant/station';
import BranchOffice from './BranchOffice';
import { useBranchStore2 } from '@/store/reserve.store';
import { getSelectedOfficeInfo } from '@/api/map/getSelectedOffice';
import { getOfficeMeetingRoomCount } from '@/api/map/getAvailableOffice';
import TabSection from './TapSection';

const getBranchImage = (imageName: string): string => {
  return `/branch/${imageName}`;
};

const BranchInfo: React.FC = () => {
  const router = useRouter();
  const { setReservedBranch } = useBranchStore2();
  const [urgentNotice, setUrgentNotice] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 2;

  const branchName = router.query.name as string;
  const address = router.query.address as string;
  const branchPhoneNumber = router.query.branchPhoneNumber as string;
  const roadFromStation = router.query.roadFromStation as string;
  const stationToBranch = router.query.stationToBranch as string;
  const branchId = router.query.branchId;

  const { urgentNoticeTitle, urgentNoticeContent } = router.query;

  const branchOfficeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { scrollToOffice } = router.query;
    if (scrollToOffice && branchOfficeRef.current) {
      setTimeout(() => {
        branchOfficeRef.current!.scrollIntoView({ behavior: 'smooth' });
      }, 300); // 300ms 정도의 딜레이를 줍니다.
    }
  }, [router.query]);

  const imagePairs = [
    ['branch1-1.png', 'branch1-2.png'],
    ['branch2-1.png', 'branch2-2.png'],
    ['branch3-1.png', 'branch3-2.png']
  ];

  const hash = Array.from(branchName || '').reduce(
    (acc: number, char: string) => acc + char.charCodeAt(0),
    0
  );
  const pairIndex = hash % imagePairs.length;

  const selectedImagePair = imagePairs[pairIndex];

  const branchImage1 = getBranchImage(selectedImagePair[0]);
  const branchImage2 = getBranchImage(selectedImagePair[1]);

  const numericBranchId = Array.isArray(branchId)
    ? parseInt(branchId[0], 10)
    : parseInt(branchId as string, 10);

  const [activeTab, setActiveTab] = useState('meetingRoom');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOfficeMeetingRoomCount(numericBranchId);
        if (data.data) {
          console.log(data);
        }
      } catch (error) {
        console.error('Error updating selected branch:', error);
      }
    };
    if (numericBranchId) {
      fetchData();
    }
  }, [numericBranchId]);

  useEffect(() => {
    if (
      branchName &&
      address &&
      branchPhoneNumber &&
      roadFromStation &&
      stationToBranch &&
      numericBranchId
    ) {
      localStorage.setItem(
        'branchInfo',
        JSON.stringify({
          branchName,
          address,
          branchPhoneNumber,
          roadFromStation,
          stationToBranch,
          branchId: numericBranchId
        })
      );
    }
  }, [
    branchName,
    address,
    branchPhoneNumber,
    roadFromStation,
    stationToBranch,
    numericBranchId
  ]);

  useEffect(() => {
    if (
      !branchName ||
      !address ||
      !branchPhoneNumber ||
      !roadFromStation ||
      !stationToBranch ||
      !branchId
    ) {
      const savedBranchInfo = localStorage.getItem('branchInfo');
      if (savedBranchInfo) {
        const {
          branchName,
          address,
          branchPhoneNumber,
          roadFromStation,
          stationToBranch,
          branchId
        } = JSON.parse(savedBranchInfo);
        router.replace(
          {
            pathname: router.pathname,
            query: {
              name: branchName,
              address,
              branchPhoneNumber,
              roadFromStation,
              stationToBranch,
              branchId
            }
          },
          undefined,
          { shallow: true }
        );
      }
    }
  }, []);

  const handleGoToReservation = async () => {
    try {
      const data = await getSelectedOfficeInfo(branchName);
      if (data.data) {
        setReservedBranch(data?.data, Date.now());
        router.push({
          pathname: '/reservation',
          query: { tab: activeTab }
        });
      }
    } catch (error) {
      console.error('Error updating selected branch:', error);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <section className="w-full h-full">
      <header className="top-0 left-0 right-0 bg-white z-50 py-4 flex items-center">
        <IoIosArrowRoundBack size={40} className="ml-[6px]" onClick={handleBackClick} />
        <span className="text-lg font-semibold ml-[8px]">{branchName}</span>
      </header>
      <div className="">
        {urgentNotice && (
          <div className="absolute top-[90px] left-1/2 px-4 py-2 transform -translate-x-1/2 w-[350px] bg-white bg-opacity-80 rounded shadow border border-neutral-200 z-[9999]">
            <div className="flex items-center mb-2">
              <div className="p-1 bg-yellow-400 rounded-sm justify-center items-center gap-2.5 inline-flex">
                <span className="text-neutral-700 text-xs font-medium font-['Pretendard']">
                  긴급
                </span>
              </div>
              <p className="text-black/opacity-20 text-sm font-semibold font-['Pretendard'] ml-[7px] mt-[3px]">
                {urgentNotice.title}
              </p>
              <button className="ml-auto my-auto" onClick={() => setUrgentNotice(null)}>
                X
              </button>
            </div>
            <p className="text-neutral-700 text-sm font-normal font-['Pretendard']">
              {truncateText(urgentNotice.content, 28)}
            </p>
          </div>
        )}
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={8}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}>
          <SwiperSlide className="flex justify-center items-center h-full relative">
            <Image
              src={branchImage1}
              alt="Office Image 1"
              width={500}
              height={246}
              className="h-[246px] object-cover"
              loading="lazy"
            />
            <div className="w-[50px] absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-center">
              {currentSlide} / {totalSlides}
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center h-full relative">
            <Image
              src={branchImage2}
              alt="Office Image 2"
              width={500}
              height={246}
              className="h-[246px] object-cover"
              loading="lazy"
            />
            <div className="w-[50px] absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-center">
              {currentSlide} / {totalSlides}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <article className="">
        <div className="p-4">
          <div className="text-black/opacity-20 text-lg font-extrabold py-[10px]">
            찾아오는길
          </div>
          <div className="flex py-[10px]">
            <Image
              src="/map/OfficeLocationSmall1.svg"
              className="mb-auto pt-[3px]"
              alt="OfficeLocationSmall"
              width={12}
              height={16}
            />
            <div className="flex flex-col">
              <p className="text-sm text-gray-900 ml-[8px] mb-[5px]">{address}</p>
              <div className="flex ml-[8px] space-x-[4px] items-center">
                {stationToBranch &&
                  stationToBranch.split(',').map((line) => {
                    const trimmedLine = line.trim();
                    const abbreviation =
                      subwayLineAbbreviations[trimmedLine] || trimmedLine;
                    return (
                      <div
                        key={trimmedLine}
                        className="w-[16px] h-[16px] flex items-center justify-center rounded-full text-white font-bold"
                        style={{
                          backgroundColor: subwayLineColors[trimmedLine],
                          fontSize: '12px'
                        }}>
                        {abbreviation}
                      </div>
                    );
                  })}
                <p className="text-sm text-gray-900 ml-[8px]">{roadFromStation}</p>
              </div>
            </div>
          </div>
          <div className="flex py-[10px]">
            <Image
              src="/map/OfficeCallImg.svg"
              className="mb-auto pt-[3px]"
              alt="OfficeCallImg"
              width={12}
              height={16}
            />
            <p className="text-sm text-gray-900 ml-[8px]">{branchPhoneNumber}</p>
          </div>
          <div className="flex py-[10px]">
            <Image
              src="/map/OfficeParkImg.svg"
              className="mb-auto pt-[3px]"
              alt="OfficeParkImg"
              width={12}
              height={16}
            />
            <p className="text-sm text-gray-900 ml-[8px]">
              출차 전 2층 데스크에서 1시간 무료 적용,
              <br />
              이후 10분당 800원 비용 발생
            </p>
          </div>
        </div>
        <div className="w-full h-1 bg-neutral-200" />
        <div className="px-4 py-6">
          <div className="text-black/opacity-20 text-lg font-extrabold py-[10px]">
            공용 공간 리스트
          </div>
          <TabSection
            branchId={numericBranchId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="w-full h-px bg-neutral-200" />
        <div className="px-4 py-6">
          <div className="text-black/opacity-20 text-lg font-extrabold py-[10px]">
            편의시설
          </div>
          <div className="grid grid-cols-4 gap-4 py-[10px]">
            <div className="flex flex-col items-center">
              <Image
                src="/map/LoungeImg.svg"
                alt="LoungeImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                라운지
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/map/RechargeImg.svg"
                alt="RechargeImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                리차징룸
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/map/ParcelImg.svg"
                alt="ParcelImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                무인택배
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/map/PhoneBooseImg.svg"
                alt="PhoneBooseImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                폰부스
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/map/PrinterImg.svg"
                alt="PrinterImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                복합기
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/map/SnackBarImg.svg"
                alt="SnackBarImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                스낵바
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/map/SuppliesImg.svg"
                alt="SuppliesImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                사무용품
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/map/CoffeeImg.svg"
                alt="CoffeeImg"
                width={12}
                height={16}
                className="w-[40px] h-[40px] my-auto"
              />
              <p className="mt-2 text-center text-gray-900 text-sm font-medium font-['Pretendard'] leading-[21px]">
                무제한 커피
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-neutral-200" />
        <div className="px-4 py-6">
          <div className="text-black/opacity-20 text-lg font-extrabold">공지사항</div>
        </div>
        <div ref={branchOfficeRef}>
          <BranchOffice
            branchName={branchName}
            setUrgentNotice={setUrgentNotice}
            urgentNoticeTitle={urgentNoticeTitle as string}
            urgentNoticeContent={urgentNoticeContent as string}
          />
        </div>
        <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[393px] px-4 text-center pb-[30px] bg-white no-box-shadow">
          <button
            className="reserveBtn w-[100%] mx-auto h-12 rounded-lg border border-indigo-700 text-center text-stone-50 text-[15px] font-semibold"
            onClick={handleGoToReservation}>
            예약하기
          </button>
        </footer>
      </article>
      <style jsx global>{`
        .swiper-pagination-bullet {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BranchInfo;
