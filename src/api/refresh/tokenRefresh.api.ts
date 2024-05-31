import { getCookie } from '@/utils/cookies';
import axios from 'axios';

export const updateRefresh = async () => {
  const token = getCookie('token');
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}reissue`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });

  return response;
};
