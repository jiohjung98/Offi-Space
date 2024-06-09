// branch.store.ts
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { Branch } from '@/api/types/branch';
import { persist } from 'zustand/middleware';

interface QuestionBranch {
  selectedQuestionBranch: Branch | null;
  setSelectedQuestionBranch: (branch: Branch | null, time: number) => void;
  updatedTimeSelected: number | null;
}

export const useQuestionBranchStore = create(
  persist<QuestionBranch>(
    (set) => ({
      selectedQuestionBranch: null,
      setSelectedQuestionBranch: (branch: Branch | null, time: number) =>
        set({ selectedQuestionBranch: branch, updatedTimeSelected: time }),
      updatedTimeSelected: null
    }),
    {
      name: 'selectedBranch'
    }
  )
);
