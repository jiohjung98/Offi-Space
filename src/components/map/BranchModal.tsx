import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ModalProps } from '@/api/types/branch';
import { useRouter } from 'next/router';
import { getSelectedOfficeInfo } from '@/api/map/getSelectedOffice';
import { useBranchStore2 } from '@/store/reserve.store';


const BranchModal: React.FC<ModalProps> = ({ isOpen, onClose, branchName, branchAddress, branchActiveMeetingRoomCount, branchTotalMeetingRoomCount }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { setReservedBranch } = useBranchStore2();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentLocationButton = document.getElementById('current-location-button');
      const currentLocationText = document.getElementById('current-location-text');
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        currentLocationButton &&
        !currentLocationButton.contains(event.target as Node) &&
        currentLocationText &&
        !currentLocationText.contains(event.target as Node)
      ) {
        onClose();
      }
    };
  
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  

  if (!isOpen) return null;


  const handleOfficeInfo = async () => {
    try {
      const data = await getSelectedOfficeInfo(branchName); 
      const officeInfo = data.data; 
      console.log(officeInfo);
      router.push({
        pathname: `/branches/${encodeURIComponent(branchName)}`,
        query: { 
          name: branchName, 
          address: officeInfo.branchAddress,
          branchPhoneNumber: officeInfo.branchPhoneNumber,
          roadFromStation: officeInfo.roadFromStation,
          stationToBranch: officeInfo.stationToBranch.join(','),
          branchId: officeInfo.branchId as number,
        }
      }, `/branches/${encodeURIComponent(branchName)}`);
    } catch (error) {
      console.error('Error fetching office info:', error);
    }
  };

  const handleGoToReservation = async () => {
    try {
      const data = await getSelectedOfficeInfo(branchName); 
      if (data.data) {
        setReservedBranch(data?.data, Date.now());
        router.push('/reservation/');
      }
    } catch (error) {
      console.error('Error updating selected branch:', error);
    }
  };

  return (
    <aside className="w-[350px] mx-auto fixed bottom-[110px] left-0 right-0 z-50">
      <div ref={modalRef} className="bg-white px-4 py-6 rounded-lg shadow-lg">
        <div className='flex'>
          <div className="flex-shrink-0 w-[88px] h-[88px] bg-gray-300 rounded-md">
            <Image 
              src="/map/OfficeDefaultImg.png" 
              alt="Office" 
              width={88}
              height={88}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          <div className='ml-4 flex-1'>
            <h2 className="text-black/opacity-20 text-lg font-bold font-['Pretendard'] leading-[27px]">{branchName}</h2>
            <div className="flex items-start mt-[12px]">
              <Image src="/map/OfficeLocationSmall1.svg" alt="Location" width={12} height={16} className="mt-[2px] mr-2" />
              <p className="text-xs break-words">{branchAddress}</p>
            </div>
            <div className="flex">
              <Image src="/map/OfficeInfo.svg" alt="Location" width={12} height={12} className="mr-2" />
              <p className="text-xs break-words">회의실 {branchTotalMeetingRoomCount}개 중 현재 {branchActiveMeetingRoomCount}개 사용중</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-[25px]">
          <button 
            className="flex w-[48%] h-[36px] bg-[#EDEBF8] text-[#3B268C] px-4 py-[6px] rounded-md justify-center items-center gap-2"
            onClick={handleOfficeInfo}
          >
            상세보기
          </button>
          <button 
            className="flex w-[48%] h-[36px] text-[#3B268C] px-[6px] py-[6px] rounded-md justify-center items-center gap-2 border border-[#3E2896]"
            onClick={handleGoToReservation}
          >
            예약 바로가기
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BranchModal;
