import { create } from 'zustand';

interface useReservationType {
  open: boolean;
  /* eslint-disable no-unused-vars */
  setOpen: (payload: boolean) => void;
  reservationId: number | null;
  setReservationId: (payload: number) => void;
  isMeeting: boolean;
  setIsMeeting: (payload: boolean) => void;
  deleteOpen: boolean;
  setDeleteOpen: (payload: boolean) => void;
}

export const useReservationStore = create<useReservationType>((set) => ({
  open: false, //modal 오픈 상태
  reservationId: null, //예약 id
  isMeeting: false, // 미팅룸 모달인가?,
  deleteOpen: false,
  setOpen: (payload: boolean) =>
    set(() => ({
      open: payload
    })),
  setReservationId: (payload: number) =>
    set(() => ({
      reservationId: payload
    })),
  setIsMeeting: (payload: boolean) =>
    set(() => ({
      isMeeting: payload
    })),
  setDeleteOpen: (payload: boolean) =>
    set(() => ({
      deleteOpen: payload
    }))
}));
