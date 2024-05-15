import { create } from 'zustand';

interface usePopularPostsStoreType {
  category: string | null;
  setCategory: (payload: string) => void;
}

export const usePopularPostsStore = create<usePopularPostsStoreType>((set) => ({
  category: null,
  setCategory: (payload: string) =>
    set(() => ({
      category: payload
    }))
}));
