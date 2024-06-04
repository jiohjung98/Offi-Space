import { http, HttpResponse } from 'msw';

import { MOCK_QUESTION_DATA } from './mocks';

export const questionHandlers = [
  /* ----- 1대1문의 전송 api ----- */
  http.post(`/question`, () => {
    return HttpResponse.json('문의 전송 성공!!');
  }),

  /* ----- 1대1 문의 내역 api ----- */
  http.get(`/question`, () => {
    return HttpResponse.json(MOCK_QUESTION_DATA);
  })
];
