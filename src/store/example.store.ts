import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

//기본 사용법 타입 에러는 일단 무시

let userStore = (set) => ({
  user: null,
  setUser: (payload) =>
    set((state) => ({
      user: payload.data
    }))
});

// redux devtools처럼 chrome 확장자 앱 사용해서 사용가능
userStore = devtools(userStore);

// persist 새로고침시 데이터 유지
userStore = persist(userStore, {
  name: 'userStore'
});

export const userStore = create(userStore);
