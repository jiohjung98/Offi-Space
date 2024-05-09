// import { ICommon } from '../types/common';
import { getRequest } from '../request';
import { IUpdateProfile } from '../types/auth';

/* 회원 상세정보 */

export const userinfo = async () => {
  const response = await getRequest<IUpdateProfile>('members');
  return response;
};
