export const postData: postData[] = [
  {
    id: 'asdaasdasdasd',
    title: '글 제목1',
    content:
      '컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠 본문컨텐츠입니다.',
    image: ['/community/userImg.jpeg', '/community/userImg.jpeg'],
    category: '글 카테고리',
    tag: '글 태그1',
    createdAt: '2024-05-13T08:30:00Z',
    profileImage: '/community/userImg.jpeg',
    userCategory: '디자인',
    nickname: '닉네임_123123',
    isWished: true,
    isWriter: true,
    commentCount: 10,
    wishCount: 10,
    viewCount: 10
  },
  {
    id: 'awaewe',
    title: '글 제목1',
    content: '글 내용1',
    image: [
      '/community/userImg.jpeg',
      '/community/userImg.jpeg',
      '/community/userImg.jpeg',
      '/community/userImg.jpeg'
    ],
    category: '글 카테고리',
    tag: '글 태그1',
    createdAt: '2024-05-13T08:30:00Z',
    profileImage: '/community/userImg.jpeg',
    userCategory: '디자인',
    nickname: '닉네임_123123',
    isWished: true,
    isWriter: true,
    commentCount: 10,
    wishCount: 10,
    viewCount: 10
  },
  {
    id: 'asdawe312',
    title: '글 제목1',
    content: '글 내용1',
    image: [
      '/community/userImg.jpeg',
      '/community/userImg.jpeg',
      '/community/userImg.jpeg',
      '/community/userImg.jpeg'
    ],
    category: '글 카테고리',
    tag: '글 태그1',
    createdAt: '2024-05-13T08:30:00Z',
    profileImage: '/community/userImg.jpeg',
    userCategory: '디자인',
    nickname: '닉네임_123123',
    isWished: true,
    isWriter: true,
    commentCount: 10,
    wishCount: 10,
    viewCount: 10
  }
];

export interface postData {
  id: string;
  title: string;
  content: string;
  image?: string[];
  category: string;
  tag: string;
  createdAt: string;
  profileImage: string;
  userCategory: string;
  nickname: string;
  isWished: boolean;
  isWriter: boolean;
  commentCount: number;
  wishCount: number;
  viewCount: number;
}
