import axios from 'axios';

interface IQuestion {
  title: string;
  content: string;
}
export const signinmock = async () => {
  const response = await axios.get(`/sign`);
  return response;
};

export const questionpostmock = async ({ title, content }: IQuestion) => {
  const response = await axios.post(`/question`, { title, content });
  return response;
};

export const questiongetmock = async () => {
  const response = await axios.get(`/question`);
  return response;
};

export const reservationgetmock = async () => {
  const response = await axios.get(`/notification/reservation`);
  return response;
};

export const communitygetmock = async () => {
  const response = await axios.get(`/notification/community`);
  return response;
};
