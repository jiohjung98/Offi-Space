/* 일대일 문의 전체 조회 */

import { getRequest, postRequest } from '../request';
import {
  PostQuestionTypeResponse,
  QuestionPost,
  GetQuestionType
} from '../types/question';

export const questioninfo = async () => {
  const response = await getRequest<GetQuestionType>(
    `privatePosts?page=1&size=100&sort=string`
  );
  return response;
};

/* 일대일 문의 등록 */

export const registerquestion = async ({ title, content, branchName }: QuestionPost) => {
  const response = await postRequest<PostQuestionTypeResponse, QuestionPost>(
    'privatePosts',
    { title, content, branchName }
  );
  return response;
};
