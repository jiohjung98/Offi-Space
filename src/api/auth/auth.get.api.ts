// import { ICommon } from '../types/common';
import { getRequest } from '../request';
import { UserInfoType } from '../types/auth';

/* 회원 상세정보 */

export const userinfo = async () => {
  const response = await getRequest<UserInfoType>('members');
  return response;
};
