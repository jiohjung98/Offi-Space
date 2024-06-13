/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Branch } from '@/api/types/branch';

interface BranchStore {
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null, time: number) => void;
  updatedTimeSelected: number | null;
}

export const useBranchStore = create(
  persist<BranchStore>(
    (set) => ({
      selectedBranch: null,
      setSelectedBranch: (branch: Branch | null, time: number) => {
        set({ selectedBranch: branch, updatedTimeSelected: time });
      },
      updatedTimeSelected: null
    }),
    {
      name: 'selectedBranch',
      getStorage: () => localStorage,
      onRehydrateStorage: () => () => {}
    }
  )
);
