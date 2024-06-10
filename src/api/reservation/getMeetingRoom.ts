import { GetMeetingRoomsParams, MeetingRoomsResponse } from '../types/room';

export const getMeetingRooms = async (params: GetMeetingRoomsParams): Promise<MeetingRoomsResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = new URL(`${backendUrl}spaces/meeting-rooms`);

  // If meetingRoomTypes is empty, include all types
  if (!params.meetingRoomTypes || params.meetingRoomTypes.length === 0) {
    params.meetingRoomTypes = ['MINI', 'STANDARD', 'MEDIUM', 'STATE'];
  }

  Object.keys(params).forEach(key => {
    const value = params[key as keyof GetMeetingRoomsParams];
    if (Array.isArray(value)) {
      value.forEach(item => url.searchParams.append(key, item));
    } else if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching meeting rooms: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data: { status: string; errorCode: string | null; data: MeetingRoomsResponse } = await response.json();

  if (data.status !== 'SUCCESS') {
    throw new Error(`API Error: ${data.errorCode}`);
  }

  return data.data;
};
