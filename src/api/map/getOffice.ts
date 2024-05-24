// import { getRequest } from '../request';
// import { Branch } from '../types/branch';
// import { ICommon } from '../types/common';

// export const getBranchInfo = async () => {
//     const response = await getRequest<ICommon<Branch[]>>('/branches');
//     return response;
// };

export const getBranchInfo = async () => {
    try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await fetch('https://joo-api.store/branches', {
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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching branch info:', error);
        throw error;
    }
};

