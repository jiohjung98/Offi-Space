import { signin } from '@/api/auth/auth.post.api';
import { UserLoginType } from '@/api/types/auth';
import { setCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  const router = useRouter();

  const onSuccess = (data: UserLoginType) => {
    const { accessToken } = data.data;
    const cookieOptions = { path: '/', maxAge: 60 * 15 };

    setCookie('token', accessToken, cookieOptions);

    router.push('/');
  };

  return useMutation({
    mutationFn: signin,
    onSuccess
  });
};

export default useLogin;
