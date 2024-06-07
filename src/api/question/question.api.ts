/* 일대일 문의 전체 조회 */

import { getRequest } from '../request';
import { QuestionType } from '../types/question';

export const userinfo = async () => {
  const response = await getRequest<QuestionType>('privatePosts');
  return response;
};
