import { create } from 'zustand';

interface useCDeleteModalStoreType {
  open: boolean;
  setOpen: (payload: boolean) => void;
  deleteId: string | null;
  setDeleteId: (payload: string) => void;
  category: string | null;
  setCategory: (payload: string) => void;
}

export const useDeleteModalStore = create<useCDeleteModalStoreType>((set) => ({
  open: false, //modal 오픈 상태
  deleteId: null, // 삭제할 댓글이나 글 id
  category: null, // 댓글이냐 글이냐
  setOpen: (payload: boolean) =>
    set(() => ({
      open: payload
    })),
  setDeleteId: (payload: string) =>
    set(() => ({
      deleteId: payload
    })),
  setCategory: (payload: string) =>
    set(() => ({
      category: payload
    }))
}));
