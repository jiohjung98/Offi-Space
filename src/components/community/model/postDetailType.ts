export interface PostDetailDataType {
  postId: string;
  tag: string;
  category: string;
  title: string;
  content: string;
  postImage: string[];
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  writer: {
    profileImage: string;
    userCategory: string;
    nickname: string;
  };
  isWriter: boolean;
  isLiked: boolean;
}

export interface PostDetailType {
  status: string;
  errorCode: string | null;
  data: PostDetailDataType[];
  message: string | null;
}
