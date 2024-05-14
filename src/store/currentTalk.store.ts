import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface currentTalkType {
  currentTalk: string;
  setCurentTalk: (payload: string) => void;
}

export const useCurrentTalkStore = create(
  persist<currentTalkType>(
    (set) => ({
      currentTalk: 'career',
      setCurentTalk: (payload: string) =>
        set(() => ({
          currentTalk: payload
        }))
    }),
    {
      name: 'currentTalk'
    }
  )
);
