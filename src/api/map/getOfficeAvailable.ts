import { BranchAvailable } from '@/api/types/branch';

function formatLocalDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, -1);
  return localISOTime.split('.')[0];
}

export const getOfficeAvailable = async (
  name: string
): Promise<{ data: BranchAvailable }> => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const now = formatLocalDate();

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    const response = await fetch(
      `${backendUrl}branches/${encodeURIComponent(name)}/space?now=${encodeURIComponent(now)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch branch information');
    }
    const data: { data: BranchAvailable } = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching branch info:', error);
    throw error;
  }
};
