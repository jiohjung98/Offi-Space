import { ICommon } from '@/api/types/common';

export interface rechargingRoomDataType {
  rechargingRoomId: number;
  rechargingRoomName: string;
  rechargingRoomFloor: number;
  times: Time[];
}

export interface Time {
  startAt: string;
  endAt: string;
  canReserve: boolean;
}

export interface CheckRechargingData {
  toastType: string;
}

export type rechargingRoomType = ICommon<rechargingRoomDataType[]>;
export type CheckRechargingType = ICommon<CheckRechargingData | null>;
