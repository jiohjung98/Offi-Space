import { BranchDistanceResponse } from "../types/branch";

export const getBranchesByDistance = async (branchId: number): Promise<BranchDistanceResponse[]> => {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = new URL(`${backendUrl}branches/${branchId}/near`);

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
    throw new Error(`Error fetching branches by distance: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data: { status: string; errorCode: string | null; data: BranchDistanceResponse[] } = await response.json();

  if (data.status !== 'SUCCESS') {
    throw new Error(`API Error: ${data.errorCode}`);
  }

  return data.data;
};