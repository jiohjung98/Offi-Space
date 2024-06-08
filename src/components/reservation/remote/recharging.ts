import { getRequest } from '@/api/request';
import { rechargingRoomType } from '../model/recharging';

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
