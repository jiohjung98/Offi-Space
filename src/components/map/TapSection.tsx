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
    if (!data) return <div>Loading...</div>;

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
          className={`flex-1 text-center py-4 cursor-pointer ${activeTab === 'meetingRoom' ? 'border-b-2 border-purple-600' : ''}`}
          onClick={() => setActiveTab('meetingRoom')}
        >
          미팅룸
        </div>
        <div
          className={`flex-1 text-center py-4 cursor-pointer ${activeTab === 'rechargingRoom' ? 'border-b-2 border-purple-600' : ''}`}
          onClick={() => setActiveTab('rechargingRoom')}
        >
          리차징룸
        </div>
        <div
          className={`flex-1 text-center py-4 cursor-pointer ${activeTab === 'focusZone' ? 'border-b-2 border-purple-600' : ''}`}
          onClick={() => setActiveTab('focusZone')}
        >
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
