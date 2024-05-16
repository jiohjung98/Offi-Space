import { create } from 'zustand';

interface useCategoryStoreType {
  category: string | null;
  setCategory: (payload: string) => void;
}

export const useCategoryStore = create<useCategoryStoreType>((set) => ({
  category: null,
  setCategory: (payload: string) =>
    set(() => ({
      category: payload
    }))
}));
