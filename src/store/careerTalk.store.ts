import { useCareerDescription } from '@/components/community/hooks/useCareerDesscription';
import { useMemberStore } from '@/store/user';
import { create } from 'zustand';

interface useCareerTalkType {
  modalOpen: boolean;
  /* eslint-disable no-unused-vars */
  setModal: (payload: boolean) => void;
  initialPosition: string;
  setPosition: (payload: string) => void;
}

export const useCareerTalk = create<useCareerTalkType>((set) => ({
  modalOpen: false,
  initialPosition: useCareerDescription(
    useMemberStore.getState().member.memberJob
  ) as string,
  setModal: (payload: boolean) =>
    set(() => ({
      modalOpen: payload
    })),
  setPosition: (payload: string) =>
    set(() => ({
      initialPosition: payload
    }))
}));
