import React, { useEffect, useState } from 'react';
import { getMeetingRooms } from '@/api/reservation/getMeetingRoom';
import { GetMeetingRoomsParams } from '@/api/types/room';
import { useBranchStore } from '@/store/branch.store';

const formatDateToCustomString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const MeetingRoomIndex = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const [params, setParams] = useState<GetMeetingRoomsParams | null>(null);

  useEffect(() => {
    if (!selectedBranch) return;

    const now = new Date();
    let startAt: Date;

    if (now.getMinutes() > 30) {
      startAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
    } else {
      startAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 30, 0);
    }

    const endAt: Date = new Date(startAt.getTime() + 60 * 60 * 1000);

    const formattedStartAt = formatDateToCustomString(startAt);
    const formattedEndAt = formatDateToCustomString(endAt);

    console.log(formattedStartAt);
    console.log(formattedEndAt);

    const initialParams: GetMeetingRoomsParams = {
      startAt: formattedStartAt,
      endAt: formattedEndAt,
      branchName: selectedBranch.branchName,
      meetingRoomTypes: ['MINI', 'STANDARD', 'MEDIUM', 'STATE'],
      projectorExists: false,
      canVideoConference: false,
      isPrivate: false,
      sortTarget: 'roomCapacity',
      sortDirection: 'ASC',
    };

    setParams(initialParams);
  }, [selectedBranch]);

  const fetchMeetingRooms = async (params: GetMeetingRoomsParams) => {
    try {
      const meetingRooms = await getMeetingRooms(params);
      console.log('Meeting Rooms:', meetingRooms);
    } catch (error) {
      console.error('Error fetching meeting rooms:', error);
    }
  };

  useEffect(() => {
    if (params) {
      fetchMeetingRooms(params);
    }
  }, [params]);

  return <div>미팅룸</div>;
};

export default MeetingRoomIndex;
