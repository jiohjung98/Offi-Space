import { create } from 'zustand';

interface useCareerTalkType {
  modalOpen: boolean;
  setModal: (payload: boolean) => void;
  initialPosition: string;
  setPosition: (payload: string) => void;
}

export const useCareerTalk = create<useCareerTalkType>((set) => ({
  modalOpen: false,
  initialPosition: '',
  setModal: (payload: boolean) =>
    set(() => ({
      modalOpen: payload
    })),
  setPosition: (payload: string) =>
    set(() => ({
      initialPosition: payload
    }))
}));
