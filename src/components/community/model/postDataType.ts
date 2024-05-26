import { ICommon } from '@/api/types/common';

export interface postDataType {
  postId: string | number;
  title: string;
  content: string;
  images: string[];
  category: string;
  tag: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  writer: Writer;
  isWished: boolean;
  isWriter: boolean;
}

export interface Writer {
  profile: string;
  job: string;
  nickname: string;
}

export type PostAllType = ICommon<postDataType | null>;
