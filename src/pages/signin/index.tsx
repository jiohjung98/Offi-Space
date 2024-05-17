import MainContainer from '@/components/shared/MainContainer';
import SigninForm from '@/components/signin/SigninForm';

import Link from 'next/link';

const SignPage = () => {
  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-[230px]">
        <div className="w-[280px] h-[57px]">
          <img src="/logo.png" alt="" className="w-full object-cover" />
        </div>
      </div>
      <SigninForm />
      <div className="text-center mt-[10px]">
        <span className="text-neutral-400 text-sm font-light font-pretendard">
          비밀번호를 잊으셨나요?{' '}
        </span>
        <Link href="/sign/findpassword">
          <span className="text-neutral-400 text-sm font-light font-pretendard underline">
            비밀번호 찾기{' '}
          </span>
        </Link>
      </div>
    </MainContainer>
  );
};

export default SignPage;
