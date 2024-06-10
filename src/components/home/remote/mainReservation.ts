import { getRequest } from '@/api/request';
import { AllAvailableCountType } from '../model/mainReservation';
import { TodayList } from '@/components/reservation/model/myreservation';

export const getAllAvailableCount = async (branchId: number) => {
  try {
    const { data } = await getRequest<AllAvailableCountType>(
      `branches/${branchId}/available-count`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getDayReservationList = async (localDate: string) => {
  try {
    const { data } = await getRequest<TodayList>(
      `reservations/week?localDate=${localDate}`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
