import axios from 'axios';

export const updateRefresh = (accessToken: string) => {
  const formData = new FormData();
  formData.append('accessToken', accessToken);

  return axios.post('/auth/refresh', formData);
};
