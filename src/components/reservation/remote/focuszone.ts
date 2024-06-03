import { getRequest, postRequest } from '@/api/request';
import { CheckDeskIdType, FocusInfoType, FocusSeatCountType } from '../model/focusInfo';
import { ICommon } from '@/api/types/common';

interface reservationFocusReqType {
  focusDeskId: number;
}

export const getFocuszoneSeatInfo = async (branchId: number) => {
  try {
    const { data } = await getRequest<FocusInfoType>(`spaces/focus-zone/${branchId}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getFocuszoneSeatCount = async (branchId: number) => {
  try {
    const { data } = await getRequest<FocusSeatCountType>(
      `spaces/focus-zone/${branchId}/available-seat-count`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const checkDeskId = async (deskId: number) => {
  try {
    const { data } = await getRequest<CheckDeskIdType>(
      `reservations/focus-desks/check-overlap/${deskId}`
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const reservationFocus = async (deskId: number) => {
  try {
    const response = await postRequest<ICommon<null>, reservationFocusReqType>(
      `reservations/focus-desks`,
      {
        focusDeskId: deskId
      }
    );
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};
