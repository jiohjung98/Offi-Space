import { deleteRequest, getRequest } from '@/api/request';
import {
  ReservationDetail,
  TodayCountType,
  TodayList,
  reservationDetailData
} from '../model/myreservation';
import { ICommon } from '@/api/types/common';

export const getTodayReservationCount = async () => {
  try {
    const { data } = await getRequest<TodayCountType>(`reservations/today/count`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getTodayReservationList = async () => {
  try {
    const { data } = await getRequest<TodayList>(`reservations/today`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getReservationDetail = async (reservationId: number | null) => {
  try {
    const { data } = await getRequest<ReservationDetail>(`reservations/${reservationId}`);
    console.log(data);
    return data as reservationDetailData;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteFocuszone = async (deskId: number) => {
  try {
    const { data } = await deleteRequest<ICommon<null>>(
      `reservations/focus-desks/${deskId}`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
