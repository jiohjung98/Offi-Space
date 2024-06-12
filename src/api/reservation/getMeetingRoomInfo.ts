import { MeetingRoomInfo } from '../types/room';

export const getMeetingRoomInfo = async (
  meetingRoomId: string
): Promise<MeetingRoomInfo> => {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${backendUrl}spaces/meeting-rooms/${meetingRoomId}`;

  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error fetching meeting room info: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data: { status: string; errorCode: string | null; data: MeetingRoomInfo } =
    await response.json();

  if (data.status !== 'SUCCESS') {
    throw new Error(`API Error: ${data.errorCode}`);
  }

  return data.data;
};
