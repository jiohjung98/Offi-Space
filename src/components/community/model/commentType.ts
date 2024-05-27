import { ICommon } from '@/api/types/common';

export interface CommentDataType {
  commentId: string;
  content: string | null;
  createdDate: string;
  writer: CommentWriter;
  isWriter: boolean;
}

export interface CommentWriter {
  profile: string;
  job: string;
  nickname: string;
}

export interface CommentAllType {
  content: CommentDataType[];
  hasNext: boolean;
}

export type CommentType = ICommon<CommentAllType | null>;
