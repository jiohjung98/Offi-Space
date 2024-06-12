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
  spaceFloor: number;
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
  participants: participantsType[];
  myMemberType: string;
  reservationProgress: string;
  reservationStatus: string;
}

export interface Representative {
  memberId: number;
  memberName: string;
  memberEmail: string;
  imageUrl: string;
  memberType: string;
}

export interface participantsType {
  memberId: number;
  memberName: string;
  memberEmail: string;
  imageUrl: string;
  memberType: string;
}

export type TodayCountType = ICommon<todayCountData>;
export type TodayList = ICommon<todayListData[]>;
export type ReservationDetail = ICommon<reservationDetailData>;
export type expectedList = ICommon<todayListData[]>;
