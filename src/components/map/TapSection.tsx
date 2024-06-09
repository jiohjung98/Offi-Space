import React, { useState, useEffect } from 'react';
import { getOfficeMeetingRoomCount } from '@/api/map/getAvailableOffice';
import { OfficeRoomCounts } from '@/api/types/branch';
import Image from 'next/image';

const imagePairs = [
  {
    mini: '/office/mini1.png',
    standard: '/office/standard1.png',
    medium: '/office/medium1.png',
    state: '/office/state1.png',
  },
  {
    mini: '/office/mini2.png',
    standard: '/office/standard2.png',
    medium: '/office/medium2.png',
    state: '/office/state2.png',
  },
  {
    mini: '/office/mini3.png',
    standard: '/office/standard3.png',
    medium: '/office/medium3.png',
    state: '/office/state3.png',
  },
];

const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
};

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const TabSection = ({ branchId }: { branchId: number }) => {
  const [activeTab, setActiveTab] = useState('meetingRoom');
  const [data, setData] = useState<OfficeRoomCounts | null>(null);
  const [selectedImages, setSelectedImages] = useState(imagePairs[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOfficeMeetingRoomCount(branchId);
        if (result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (branchId) {
      fetchData();
    }
  }, [branchId]);

  useEffect(() => {
    if (branchId) {
      const seed = hashCode(branchId.toString());
      const randomIndex = Math.floor(seededRandom(seed) * imagePairs.length);
      setSelectedImages(imagePairs[randomIndex]);
    }
  }, [branchId]);

  const renderContent = () => {
    if (!data) return <div></div>;

    const rooms = [
      { type: 'mini', label: '미니', capacity: '1~4명', description: '적은 인원 수가 빠르게 회의 진행할 수 있는 공간', count: data.miniRoomCount },
      { type: 'standard', label: '스탠다드', capacity: '5~8명', description: '적은 인원 수가 빠르게 회의 진행할 수 있는 공간', count: data.standardRoomCount },
      { type: 'medium', label: '미디움', capacity: '9~12명', description: '적은 인원 수가 빠르게 회의 진행할 수 있는 공간', count: data.mediumRoomCount },
      { type: 'state', label: '스테이트', capacity: '13~15명', description: '여러 팀의 협업 또는 화상회의가 편한 공간', count: data.stateRoomCount },
    ] as const;

    return (
      <div>
      {rooms.map((room, index) => (
        <div key={index} className={`relative flex flex-col h-full rounded mb-[12px] ${activeTab !== 'meetingRoom' && 'hidden'}`}>
          <Image src={selectedImages[room.type]} width={361} height={120} alt={`${room.label} Room`} className="object-cover rounded" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between bg-black bg-opacity-50 text-white p-4 rounded">
            <div className='h-full'>
              <div className='flex flex-row justify-between'>
                <p className="text-white text-base font-semibold font-['Pretendard']">{room.label}</p>
                <p className="text-white text-base font-normal font-['Pretendard']">{room.count}개</p>
              </div>
              <div className='flex flex-row'>
                <Image src="/office/people.svg" alt="people" width={14} height={10} className="" />
                <p className="text-white text-xs font-normal font-['Pretendard'] ml-[3px]">{room.capacity} 수용 가능</p>
              </div>
              <p className="absolute bottom-0 pb-4 mt-auto text-white text-sm font-normal font-['Pretendard']">{room.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
  };

  return (
    <div>
      <div className="flex">
        <div
          className={`flex-1 text-center pt-4 pb-1 cursor-pointer ${activeTab === 'meetingRoom' ? 'border-b-2 border-indigo-700 text-indigo-700 text-base font-bold' : 'font-medium text-black/opacity-20 text-base'}`}
          onClick={() => setActiveTab('meetingRoom')}
        >
          <img
            src={activeTab === 'meetingRoom' ? '/map/MeetingRoom.svg' : '/map/MeetingRoomInactive.svg'}
            alt="Meeting Room Icon"
            className="mx-auto mb-[9px]"
          />
          미팅룸
        </div>
        <div
          className={`flex-1 text-center pt-4 pb-1 cursor-pointer ${activeTab === 'rechargingRoom' ? 'border-b-2 border-indigo-700 text-indigo-700 text-base font-bold' : 'font-medium text-black/opacity-20 text-base'}`}
          onClick={() => setActiveTab('rechargingRoom')}
        >
          <img
            src={activeTab === 'rechargingRoom' ? '/map/Recharge.svg' : '/map/RechargeInactive.svg'}
            alt="Recharge Room Icon"
            className="mx-auto mb-[9px]"
          />
          리차징룸
        </div>
        <div
          className={`flex-1 text-center pt-4 pb-1 cursor-pointer ${activeTab === 'focusZone' ? 'border-b-2 border-indigo-700 text-indigo-700 text-base font-bold' : 'font-medium text-black/opacity-20 text-base'}`}
          onClick={() => setActiveTab('focusZone')}
        >
          <img
            src={activeTab === 'focusZone' ? '/map/FocusZone.svg' : '/map/FocusZoneInactive.svg'}
            alt="Focus Zone Icon"
            className="mx-auto mb-[9px]"
          />
          포커스존
        </div>
      </div>
      <div className="py-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabSection;
