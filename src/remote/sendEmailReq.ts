import { IEmail } from '@/api/types/auth';
import axios from 'axios';

export const sendEmailReq = async ({ emailAddress }: IEmail) => {
  const response = await axios.post('https://joo-api.store/auth/email', {
    emailAddress
  });

  return response;
};
