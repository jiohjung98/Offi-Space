import React from 'react';
import { getMeetingRooms } from '@/api/reservation/getMeetingRoom';
import { GetMeetingRoomsParams } from '@/api/types/room';

const MeetingRoomIndex = () => {

    const fetchMeetingRooms = async () => {
        const params: GetMeetingRoomsParams = {
          startAt: '2024-06-02T20:00:00',
          endAt: '2024-06-02T21:00:00',
          branchName: '강남4호점',
          meetingRoomTypes: ['MINI', 'STANDARD'],
          projectorExists: false,
          canVideoConference: false,
          isPrivate: false,
          sortTarget: 'roomCapacity',
          sortDirection: 'ASC',
        };
      
        try {
          const meetingRooms = await getMeetingRooms(params);
          console.log('Meeting Rooms:', meetingRooms);
        } catch (error) {
          console.error('Error fetching meeting rooms:', error);
        }
      };

    const handleApi = () => {
        fetchMeetingRooms();
    }

  return <div onClick={handleApi}>미팅룸</div>;
};

export default MeetingRoomIndex;
