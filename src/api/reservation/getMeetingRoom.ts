import { AxiosRequestConfig } from 'axios';
import { getRequest } from '../request';
import { MeetingRoom, GetMeetingRoomsParams } from '../types/room';

export const getMeetingRooms = async (params: GetMeetingRoomsParams): Promise<MeetingRoom[]> => {
  const config: AxiosRequestConfig = {
    params,
  };
  const response = await getRequest<{ status: string; errorCode: string | null; data: MeetingRoom[] }>(
    '/spaces/meeting-rooms',
    config
  );
  return response.data;
};

