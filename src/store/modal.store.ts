import { create } from 'zustand';

interface useModalStoreType {
  open: boolean;
  /* eslint-disable no-unused-vars */
  setOpen: (payload: boolean) => void;
  deleteId: string | null;
  setDeleteId: (payload: string) => void;
  category: string | null;
  setCategory: (payload: string) => void;
  commentId: string | null;
  setCommentId: (payload: string) => void;
}

export const useModalStore = create<useModalStoreType>((set) => ({
  open: false, //modal 오픈 상태
  deleteId: null, // 삭제할 댓글이나 글 id
  category: null, // 댓글이냐 글이냐
  commentId: null,
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
    })),
  setCommentId: (payload: string) =>
    set(() => ({
      commentId: payload
    }))
}));
