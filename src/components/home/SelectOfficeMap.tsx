import React, { useEffect, useRef } from 'react';
import { Branch } from '@/api/types/branch';
import Image from 'next/image';
import { useBranchStore } from '@/store/branch.store';

interface SelectOfficeMapProps {
  branch: Branch;
  onClose: () => void;
}

const SelectOfficeMap: React.FC<SelectOfficeMapProps> = ({ branch, onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const setSelectedBranch = useBranchStore((state) => state.setSelectedBranch);

  const handleBranchSelection = () => {
    setSelectedBranch(branch);
    onClose();
  };

  useEffect(() => {
    const { naver } = window;
    if (naver && branch) {
      const mapOptions = {
        center: new naver.maps.LatLng(branch.branchLatitude, branch.branchLongitude),
        zoom: 16,
      };
      const map = new naver.maps.Map(mapRef.current!, mapOptions);

      new naver.maps.Marker({
        position: new naver.maps.LatLng(branch.branchLatitude, branch.branchLongitude),
        map,
        icon: {
          url: '/map/OfficeActive.svg',
          size: new naver.maps.Size(48, 48),
          scaledSize: new naver.maps.Size(48, 48),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(24, 24),
        },
      });
    }
  }, [branch]);

  useEffect(() => {
    console.log('branch', branch);
  }, [branch]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div ref={mapRef} className="w-[393px] mx-auto h-full" />
      <div className="absolute top-4 right-4">
        <aside className="w-[373px] mx-auto fixed bottom-[85px] left-0 right-0 z-50">
          <div className="bg-white px-4 py-6 rounded-lg shadow-lg">
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
                <h2 className="text-xl font-semibold">{branch.branchName}</h2>
                {branch.branchAddress && branch.branchLatitude && branch.branchLongitude && (
                  <div className="flex items-start">
                    <Image src="/map/OfficeLocationSmall1.svg" alt="Location" width={12} height={16} className="mt-[4px] mr-2" />
                    <p className="text-sm break-words">{branch.branchAddress}</p>
                  </div>
                )}
                <div className="flex">
                  <Image src="/map/OfficeInfo.svg" alt="Location" width={12} height={12} className="mr-2" />
                  <p className="text-sm break-words">회의실 43개 중 현재 22개 사용중</p>
                </div>
              </div>
            </div>
            <div className="flex w-full pt-[25px]">
              <button 
                className="flex w-[326px] h-[36px] mx-auto bg-[#EDEBF8] text-[#3B268C] px-4 py-[6px] rounded-md justify-center items-center gap-2"
                onClick={handleBranchSelection}
              >
                지점 설정
              </button>
            </div>
          </div>
        </aside>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SelectOfficeMap;
