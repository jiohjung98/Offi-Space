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

export interface reservationDetailData {
  reservationId: number;
  reservationName: string;
  startAt: string;
  endAt: string;
  branchName: string;
  spaceName: string;
  spaceFloor: number;
  branchAddress: string;
  spaceType: string;
  representative: Representative;
  participants: any[];
  myMemberType: string;
  reservationProgress: string;
}

export interface Representative {
  memberId: number;
  memberName: string;
  memberEmail: string;
  imageUrl: string;
  memberType: string;
}

export type TodayCountType = ICommon<todayCountData>;
export type TodayList = ICommon<todayListData[]>;
export type ReservationDetail = ICommon<reservationDetailData>;
