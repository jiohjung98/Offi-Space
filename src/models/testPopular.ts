export interface testPopularType {
  status: string;
  errorCode: string | null;
  data: testPopularData[];
  message: string | null;
}

export interface testPopularData {
  content: string;
  tag: string[];
  viewCount: number;
  replyCount: number;
  category?: string;
}
