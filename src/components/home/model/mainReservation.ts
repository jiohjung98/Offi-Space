import { ICommon } from '@/api/types/common';

export interface AllAvailableCountData {
  totalMeetingRoomCount: number;
  availableMeetingRoomCount: number;
  totalRechargingRoomCount: number;
  availableRechargingRoomCount: number;
  totalFocusDeskCount: number;
  availableFocusDeskCount: number;
}

export type AllAvailableCountType = ICommon<AllAvailableCountData>;
