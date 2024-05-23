/* 비밀번호 재설정 */
// const a = 0;

import { patchRequest } from '../request';
import { IPasswordChage } from '../types/auth';
import { ICommon } from '../types/common';

export const changepassword = async ({
  currentPassword,
  newPassword
}: IPasswordChage) => {
  const response = await patchRequest<ICommon<null>, IPasswordChage>('members/password', {
    currentPassword,
    newPassword
  });

  return response;
};
