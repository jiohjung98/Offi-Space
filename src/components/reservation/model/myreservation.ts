import { ICommon } from '@/api/types/common';

export interface todayCountData {
  count: number;
}
export interface todayListData {
  reservationId: number;
  reservationName: string;
  branchName: string;
  spaceName: string;
  startAt: string;
  spaceType: string;
  memberImageUrls: string[];
  memberType: string;
  endAt: string;
}

export type TodayCountType = ICommon<todayCountData>;
export type TodayList = ICommon<todayListData[]>;
