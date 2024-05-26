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

export type CommentType = ICommon<CommentDataType | null>;
