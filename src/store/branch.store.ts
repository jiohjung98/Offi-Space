import { create } from 'zustand';
import { Branch } from '@/api/types/branch';

interface BranchStore {
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
}

export const useBranchStore = create<BranchStore>((set) => ({
  selectedBranch: null,
  setSelectedBranch: (branch: Branch | null) => set({ selectedBranch: branch }),
}));
