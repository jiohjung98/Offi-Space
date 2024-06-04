/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { getMeetingRoomInfo } from '@/api/reservation/getMeetingRoomInfo'; // API 호출 함수의 경로에 맞게 수정하세요
import { MeetingRoom } from "@/api/types/room";

const MeetingRoomInfo = () => {
  const [meetingRoom, setMeetingRoom] = useState<MeetingRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { meetingRoomId } = router.query;

  useEffect(() => {
    if (meetingRoomId) {
      getMeetingRoomInfo(meetingRoomId as string)
        .then(data => {
          setMeetingRoom(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [meetingRoomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!meetingRoom) {
    return <div>No meeting room data</div>;
  }

  return (
    <div>
      <h1>{meetingRoom.meetingRoomId}</h1>
      <p>{meetingRoom.meetingRoomCapacity}</p>
      <p>{meetingRoom.meetingRoomFloor}</p>
      <p>{meetingRoom.meetingRoomName}</p>
      {/* 필요한 다른 정보들도 여기에 추가하세요 */}
    </div>
  );
};

export default MeetingRoomInfo;
