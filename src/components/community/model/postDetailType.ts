import { ICommon } from '@/api/types/common';

export interface PostDetailDataType {
  postId: string;
  tag: string;
  category: string;
  title: string;
  content: string;
  images: string[];
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  writer: {
    profile: string;
    userCategory: string;
    nickname: string;
  };
  isWriter: boolean;
  isLiked: boolean;
}

interface PostType {
  content: PostDetailDataType[];
  hasNext: boolean;
}

export type PostDetailType = ICommon<PostType | null>;
