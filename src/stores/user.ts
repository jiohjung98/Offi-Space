import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* eslint-disable no-unused-vars */

interface IMember {
  member: object;
  setmember: (payload: string) => void;
}

export const useMemberStore = create(
  persist<IMember>(
    (set) => ({
      member: { job: '' },
      setmember: (payload: string) =>
        set((state) => ({
          ...state,
          member: {
            ...state.member,
            job: payload
          }
        }))
    }),
    {
      name: 'job'
    }
  )
);
