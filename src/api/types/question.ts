// import { Branch } from './branch';
import { ICommon } from './common';
export interface QuestionPost {
  title: string;
  content: string;
  branchName: string | undefined;
}

interface QuestionGet {
  id: number;
  title: string;
  content: string;
  branchName: string;
  createdDate: string;
  answer: {
    privatePostAnswerId: number;
    content: string;
  };
}

interface QuestionGetResponse {
  privatePostList: QuestionGet[];
  hasNext: boolean;
}

interface QuestionMessage {
  id: number;
}

export type GetQuestionType = ICommon<QuestionGetResponse>;

export type PostQuestionTypeResponse = ICommon<QuestionMessage>;
