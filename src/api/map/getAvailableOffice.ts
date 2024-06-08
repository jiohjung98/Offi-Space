// getAvailableOffice.ts
import { OfficeRoomCounts } from '@/api/types/branch';

export const getOfficeMeetingRoomCount = async (branchId: number): Promise<{ data: OfficeRoomCounts }> => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const response = await fetch(`${backendUrl}spaces/${branchId}/count`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch meeting room count');
    }
    const data: { data: OfficeRoomCounts } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching meeting room count:', error);
    throw error;
  }
};
