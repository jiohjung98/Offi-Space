import axios from 'axios';

export const signinmock = async () => {
  const response = await axios.get(`/sign`);
  return response;
};
