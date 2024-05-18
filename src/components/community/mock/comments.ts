export const commentsData: Comment[] = [
  {
    id: 'asdasd',
    profileImage: '/community/userImg.jpeg',
    category: '카테고리1',
    nickname: '닉네임1',
    content:
      '댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다',
    createdAt: '2024-05-14T08:30:00Z',
    isWritter: true
  },
  {
    id: 'asdasdasasd',
    profileImage: '/community/userImg.jpeg',
    category: '카테고리2',
    nickname: '닉네임2',
    content:
      '댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다',
    createdAt: '2024-05-14T08:30:00Z',
    isWritter: false
  },
  {
    id: 'dasdasdasd',
    profileImage: '/community/userImg.jpeg',
    category: '카테고리2',
    nickname: '닉네임2',
    content:
      '댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다',
    createdAt: '2024-05-14T08:30:00Z',
    isWritter: false
  },
  {
    id: 'asdasdasdasd',
    profileImage: '/community/userImg.jpeg',
    category: '카테고리2',
    nickname: '닉네임2',
    content:
      '댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다 댓글입니다',
    createdAt: '2024-05-14T08:30:00Z',
    isWritter: false
  },
  {
    id: 'asdasdasd',
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
  id: string;
}
