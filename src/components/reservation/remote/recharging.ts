import { getRequest, postRequest } from '@/api/request';
import { rechargingRoomType } from '../model/recharging';
import { ICommon } from '@/api/types/common';

interface reservationRechargingReqType {
  rechargingRoomId: number;
  startAt: string;
}

export const getRechargingRoom = async (branchId: number) => {
  try {
    const { data } = await getRequest<rechargingRoomType>(
      `spaces/recharging-rooms/${branchId}`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const checkValidRecharging = async (startTime: string) => {
  try {
    const data = await getRequest<ICommon<null>>(
      `reservations/recharging-rooms/check-overlap?startAt=${startTime}`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const reservationRecharging = async ({
  rechargingRoomId,
  startAt
}: reservationRechargingReqType) => {
  try {
    const response = await postRequest<ICommon<null>, reservationRechargingReqType>(
      `reservations/recharging-rooms`,
      {
        rechargingRoomId,
        startAt
      }
    );
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};
