/* 회원탈퇴 */
//
//

import { deleteRequest } from '../request';

export const del = async () => {
  const response = await deleteRequest<null>('members');

  return response;
};
