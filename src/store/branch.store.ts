/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { Branch } from '@/api/types/branch';
import { persist } from 'zustand/middleware';

interface BranchStore {
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
}

export const useBranchStore = create(
    persist<BranchStore>(
        (set) => ({
            selectedBranch: null,
            setSelectedBranch: (branch: Branch | null) => set({ selectedBranch: branch }),
        }),
        {
            name: 'selectedBranch'
        }
        )
    );
