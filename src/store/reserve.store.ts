// reserve.store.ts
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { Branch } from '@/api/types/branch';
import { persist } from 'zustand/middleware';

interface BranchStore2 {
  reservedBranch: Branch | null;
  setReservedBranch: (branch: Branch | null, time: number) => void; 
  updatedTimeReserved: number | null; 
}

export const useBranchStore2 = create(
  persist<BranchStore2>(
    (set) => ({
      reservedBranch: null,
      setReservedBranch: (branch: Branch | null, time: number) =>
        set({ reservedBranch: branch, updatedTimeReserved: time }), 
      updatedTimeReserved: null,
    }),
    {
      name: 'reserveBranch',
    }
  )
);
