import { IUserInfo } from '@/api/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* eslint-disable no-unused-vars */

interface IMember {
  member: IUserInfo;
  setmember: (payload: IUserInfo | undefined) => void;
}

export const useMemberStore = create(
  persist<IMember>(
    (set) => ({
      member: {
        memberEmail: '',
        memberName: '',
        memberNickName: '',
        memberJob: '',
        memberSmsAgree: ''
      },
      setmember: (payload: IUserInfo | undefined) =>
        set((state) => ({
          ...state,
          member: {
            ...state.member,
            ...payload
          }
        }))
    }),
    {
      name: 'member'
    }
  )
);

export const useMember = () => useMemberStore((state) => state.member);
export const useSetMember = () => useMemberStore((state) => state.setmember);
