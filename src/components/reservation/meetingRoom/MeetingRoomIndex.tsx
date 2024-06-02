import React, { useEffect, useState } from 'react';
import { getMeetingRooms } from '@/api/reservation/getMeetingRoom';
import { GetMeetingRoomsParams, MeetingRoom } from '@/api/types/room';
import { useBranchStore } from '@/store/branch.store';
import Image from 'next/image';

const formatDateToCustomString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

const MeetingRoomIndex = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const [params, setParams] = useState<GetMeetingRoomsParams | null>(null);
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

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

    setCurrentTime(formattedStartAt);

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
      const rooms = await getMeetingRooms(params);
      rooms.sort((a, b) => a.meetingRoomCapacity - b.meetingRoomCapacity || a.meetingRoomId - b.meetingRoomId);
      setMeetingRooms(rooms);
      console.log(rooms);
    } catch (error) {
      console.error('Error fetching meeting rooms:', error);
    }
  };

  useEffect(() => {
    if (params) {
      fetchMeetingRooms(params);
      console.log(params);
    }
  }, [params]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">{currentTime}</div>
        <div className="text-lg font-bold">인원 수 ▼</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {meetingRooms.map((room) => (
          <div key={room.meetingRoomId} className="border rounded-lg overflow-hidden bg-white text-center">
            <div className="w-[175px] h-[124px] bg-gray-200">
              <Image src={room.meetingRoomImage || '/meetingRoomImg.svg'} width={175} height={124} alt={room.meetingRoomName} className="object-cover" />
            </div>
            <div className="p-4">
              <div className="text-lg font-bold">{room.meetingRoomName}</div>
              <div className="text-sm text-gray-500">{room.meetingRoomFloor}층</div>
              <div className="text-sm text-gray-500">1-{room.meetingRoomCapacity}명</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingRoomIndex;
