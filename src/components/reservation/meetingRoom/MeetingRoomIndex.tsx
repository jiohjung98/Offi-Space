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
    <div className="p-4 h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">{currentTime}</div>
        <div className="text-lg font-bold">인원 수 ▼</div>
      </div>
      <div className="grid grid-cols-2 gap-x-[11px] gap-y-[24px]">
        {meetingRooms.map((room) => (
          <div key={room.meetingRoomId} className="overflow-hidden bg-white text-center">
            <div className="rounded">
              <Image src={room.meetingRoomImage || '/meetingRoomImg.svg'} width={175} height={124} alt={room.meetingRoomName} className="object-cover rounded" />
            </div>
            <div className="flex flex-col">
              <div className="text-neutral-700 text-base font-bold font-['Pretendard'] mr-auto mt-[16px]">{room.meetingRoomName}</div>
              <div className='flex mt-[4px] items-center'>
                <Image src={'/floor.svg'} width={14} height={14} alt='floor' className='mr-[6px]'/>
                <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] my-auto">{room.meetingRoomFloor}층</div>
                <Image src={'/capacity.svg'} width={14} height={14} alt='capacity' className='mr-[6px]'/>
                <div className="text-stone-500 text-xs font-normal font-['Pretendard']">1~{room.meetingRoomCapacity}명</div>
              </div>
            </div>
          </div>
        ))}
        <div className='h-[100px]'></div>
      </div>
    </div>
  );
};

export default MeetingRoomIndex;
