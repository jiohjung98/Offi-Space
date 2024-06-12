import { Reserve } from '../types/reserve';

export const reserveMeetingRoom = async (reservation: Reserve): Promise<void> => {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${backendUrl}reservations/meeting-rooms`;

  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reservation)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error reserving meeting room: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
};
