import { signin } from '@/api/auth/auth.post.api';
import { UserLoginType } from '@/api/types/auth';
import { setCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { getTokenHandler } from '@/components/pwa/Fcm';
import { fcmpost } from '@/api/fcm/fcm.post.api';

const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const onSuccess = async (data: UserLoginType) => {
    const { accessToken } = data.data;
    const cookieOptions = { path: '/', maxAge: 600000 * 15 };
    const token = await getTokenHandler();
    fcmpost({ fcmToken: token });
    setCookie('token', accessToken, cookieOptions);

    router.push('/');
    console.log(token);
  };
  const onError = () => {
    console.log('error');
    setError('*아이디 혹은 비밀번호가 일치하지 않습니다');
    console.log(error);
  };
  const { mutate } = useMutation({
    mutationFn: signin,
    onSuccess,
    onError
  });
  return { mutate, error };
};

export default useLogin;
