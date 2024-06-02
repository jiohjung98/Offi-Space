import { SelectedBranch } from '@/api/types/branch';

export const getSelectedOfficeInfo = async (name: string): Promise<{ data: SelectedBranch }> => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const response = await fetch(`${backendUrl}branches/${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch branch information');
    }
    const data: { data: SelectedBranch } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching branch info:', error);
    throw error;
  }
};
