import { ICommon } from './common';

interface QuestionPost {
  id: number;
  title: string;
  content: string;
  branchName: string;
  createdDate: string;
}

interface QuestionPosttResponse {
  privatePostList: QuestionPost[];
  hasNext: boolean;
}

interface Message {
  message: string;
}

export type QuestionType = ICommon<QuestionPosttResponse & Message>;
