export interface CommentType {
  commentId: string;
  content: string;
  createdDate: string;
  writer: CommentWriter;
  isWriter: boolean;
}

export interface CommentWriter {
  profile: string;
  job: string;
  nickname: string;
}
