export const commentsData: Comment[] = [
  {
    profileImage: '/community/userImg.jpeg',
    category: '카테고리1',
    nickname: '닉네임1',
    content:
      '댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다',
    createdAt: '2024-05-14T08:30:00Z',
    isWritter: true
  },
  {
    profileImage: '/community/userImg.jpeg',
    category: '카테고리2',
    nickname: '닉네임2',
    content:
      '댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다',
    createdAt: '2024-05-14T08:30:00Z',
    isWritter: false
  }
];

export interface Comment {
  profileImage: string;
  category: string;
  nickname: string;
  content: string;
  createdAt: string;
  isWritter: boolean;
}
