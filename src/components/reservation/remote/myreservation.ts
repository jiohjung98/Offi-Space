import { getRequest } from '@/api/request';
import { TodayCountType, TodayList } from '../model/myreservation';

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

// export const getFocuszoneSeatCount = async (branchId: number) => {
//   try {
//     const { data } = await getRequest<FocusSeatCountType>(
//       `spaces/focus-zone/${branchId}/available-seat-count`
//     );
//     return data;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };

// export const checkDeskId = async (deskId: number) => {
//   try {
//     const { data } = await getRequest<CheckDeskIdType>(
//       `reservations/focus-desks/check-overlap/${deskId}`
//     );
//     return data;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };

// export const reservationFocus = async (deskId: number) => {
//   try {
//     const response = await postRequest<ICommon<null>, reservationFocusReqType>(
//       `reservations/focus-desks`,
//       {
//         focusDeskId: deskId
//       }
//     );
//     return response;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };
