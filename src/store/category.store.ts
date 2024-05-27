import { create } from 'zustand';

interface useCategoryStoreType {
  category: string;
  /* eslint-disable no-unused-vars */
  setCategory: (payload: string) => void;
}

export const useCategoryStore = create<useCategoryStoreType>((set) => ({
  category: '',
  setCategory: (payload: string) =>
    set(() => ({
      category: payload
    }))
}));
