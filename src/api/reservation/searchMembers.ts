import { Member } from '../types/member';

export const searchMembers = async (
  searchTerm: string,
  startAt: string,
  endAt: string
): Promise<{ memberCanInviteList: Member[]; memberCantInviteList: Member[] }> => {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${backendUrl}reservations/members?startAt=${startAt}&endAt=${endAt}&searchTerm=${searchTerm}`;

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
      `Error searching members: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();

  if (data.status !== 'SUCCESS') {
    throw new Error(`API Error: ${data.errorCode}`);
  }

  return {
    memberCanInviteList: data.data.memberCanInviteList,
    memberCantInviteList: data.data.memberCantInviteList
  };
};
