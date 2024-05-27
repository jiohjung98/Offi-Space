import { create } from 'zustand';

interface useCategoryStoreType {
  category: string | null;
  /* eslint-disable no-unused-vars */
  setCategory: (payload: string) => void;
}

export const useCategoryStore = create<useCategoryStoreType>((set) => ({
  category: null,
  setCategory: (payload: string) =>
    set(() => ({
      category: payload
    }))
}));
