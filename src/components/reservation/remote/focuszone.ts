import { getRequest } from '@/api/request';
import axios from 'axios';
import { FocusInfoType, FocusSeatCountType } from '../model/focusInfo';

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

export const getFocuszoneSeatInfo = async (branchId: string) => {
  try {
    const { data } = await getRequest<FocusInfoType>(`spaces/focus-zone/${branchId}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getFocuszoneSeatCount = async (branchId: string) => {
  try {
    const { data } = await getRequest<FocusSeatCountType>(
      `spaces/focus-zone/${branchId}/available-seat-count`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
