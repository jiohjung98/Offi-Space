import axios from 'axios';

interface focuszoneRequestType {
  branch: string;
  seat: string;
}

export const focuszoneRequest = async ({ branch, seat }: focuszoneRequestType) => {
  try {
    const body = {
      branch: branch,
      seat: seat
    };
    const data = axios.post('http://localhost:3000/api/reservation', body);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
