/* 비밀번호 재설정 */
// const a = 0;

import axios from 'axios';
import { patchRequest } from '../request';
import { IPasswordChage } from '../types/auth';
import { ICommon } from '../types/common';
import { getCookie } from '@/utils/cookies';

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

export const memberimage = async (imageData: FormData) => {
  const token = getCookie('token');
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}members/image`,
      imageData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );

    return response;
  } catch (e) {
    console.log(e);
  }
};
