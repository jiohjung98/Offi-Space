import React, { useState, useEffect } from 'react';
import { getOfficeMeetingRoomCount } from '@/api/map/getAvailableOffice';
import { OfficeRoomCounts } from '@/api/types/branch';

const TabSection = ({ branchId }: { branchId: number }) => {
  const [activeTab, setActiveTab] = useState('meetingRoom');
  const [data, setData] = useState<OfficeRoomCounts | null>(null);

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

  const renderContent = () => {
    if (!data) return <div></div>;

    switch (activeTab) {
      case 'meetingRoom':
        return (
          <div>
            <p>Mini Room Count: {data.miniRoomCount}</p>
            <p>Standard Room Count: {data.standardRoomCount}</p>
            <p>Medium Room Count: {data.mediumRoomCount}</p>
            <p>State Room Count: {data.stateRoomCount}</p>
          </div>
        );
      case 'rechargingRoom':
        return <div>Recharging Room Count: {data.rechargingRoomCount}</div>;
      case 'focusZone':
        return <div>Focus Desk Count: {data.focusDeskCount}</div>;
      default:
        return null;
    }
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
