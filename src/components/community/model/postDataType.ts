export interface postDataType {
  postId: string;
  title: string;
  content: string;
  image: string[];
  category: string;
  tag: string;
  createdAt: string;
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
