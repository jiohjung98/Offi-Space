import { deleteRequest, getRequest } from '@/api/request';
import {
  ReservationDetail,
  TodayCountType,
  TodayList,
  expectedList,
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

export const getExpectedReservationList = async () => {
  try {
    const { data } = await getRequest<expectedList>(`reservations`);
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
    return data as reservationDetailData;
  } catch (error: any) {
    alert('이미 종료된 일정입니다');
    window.location.href = '/';
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

export const deleteMeetingRoom = async (deskId: number) => {
  try {
    const { data } = await deleteRequest<ICommon<null>>(
      `reservations/meeting-rooms/${deskId}`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteRechargingRoom = async (deskId: number) => {
  try {
    const { data } = await deleteRequest<ICommon<null>>(
      `reservations/recharging-rooms/${deskId}`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
