// import { ICommon } from '../types/common';
import { postRequest } from '../request';
import {
  ISignIn,
  ISignUp,
  IEmail,
  IEmailAuth,
  IPhoneNumber,
  IPhoneAuth,
  UserLoginType
} from '../types/auth';
import { ICommon } from '../types/common';

/* 회원가입 */

export const signup = async ({
  email,
  password,
  memberName,
  memberJob,
  memberPhone,
  memberSmsAgree
}: ISignUp) => {
  const response = await postRequest<ICommon<null>, ISignUp>('members', {
    email,
    password,
    memberName,
    memberJob,
    memberPhone,
    memberSmsAgree
  });
  //retrun nll 처리를 하면 react query의 onSuccess 작동
  return response;
};

/* 로그인 */

export const signin = async ({ email, password }: ISignIn) => {
  const response = await postRequest<UserLoginType, ISignIn>('login', {
    email,
    password
  });

  return response;
};

/* 이메일 인증 요청 */

export const emailauthrequest = async ({ emailAddress }: IEmail) => {
  const response = await postRequest<ICommon<null>, IEmail>(`auth/email`, {
    emailAddress
  });

  return response;
};

/* 이메일 코드 검증 */

export const emailauthverify = async ({ emailAddress, code }: IEmailAuth) => {
  const response = await postRequest<ICommon<null>, IEmailAuth>(`auth/email/verify`, {
    emailAddress,
    code
  });

  return response;
};

/* 휴대전화 번호 인증 요청*/

export const phoneauthrequest = async ({ phoneNumber }: IPhoneNumber) => {
  const response = await postRequest<ICommon<null>, IPhoneNumber>(`auth/phone`, {
    phoneNumber
  });

  return response;
};

/* 휴대전화 번호 코드 검증*/

export const phoneauthverify = async ({ phoneNumber, code }: IPhoneAuth) => {
  const response = await postRequest<ICommon<null>, IPhoneAuth>(`auth/phone/verify`, {
    phoneNumber,
    code
  });

  return response;
};

/* 로그아웃*/

export const logout = async () => {
  const response = await postRequest<null, null>('logout');

  return response;
};

/* 토큰 리프레쉬*/

/* 비밀번호 검증 */

export const passwordverify = async ({ password }: { password: string }) => {
  const response = await postRequest<ICommon<null>, { password: string }>(
    'members/password/verify',
    { password }
  );

  return response;
};
