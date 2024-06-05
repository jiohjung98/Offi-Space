/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { Branch } from '@/api/types/branch';
import { persist } from 'zustand/middleware';

interface BranchStore2 {
    reservedBranch: Branch | null;
    setReservedBranch: (branch: Branch | null) => void;
}

export const useBranchStore2 = create(
    persist<BranchStore2>(
        (set) => ({
            reservedBranch: null,
            setReservedBranch: (branch: Branch | null) => set({ reservedBranch: branch }),
        }),
        {
            name: 'reserveBranch'
        }
        )
    );
