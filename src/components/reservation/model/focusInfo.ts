import { ICommon } from '@/api/types/common';

export interface FocusSeatData {
  focusDeskId: number;
  focusDeskNumber: number;
  canReserve: boolean;
}

export interface FocusSeatCount {
  totalSeatCount: number;
  availableSeatCount: number;
  reservedSeatCount: number;
}

export type FocusInfoType = ICommon<FocusSeatData[] | null>;
export type FocusSeatCountType = ICommon<FocusSeatCount[] | null>;
