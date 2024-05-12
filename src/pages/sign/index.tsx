import MainContainer from '@/components/shared/MainContainer';
import SignInButton from '@/components/shared/sign/SignInButton';
import SignUpButton from '@/components/shared/sign/SignUpButton';

import Link from 'next/link';

const SignHomePage = () => {
  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-[470px]">
        <div className="w-[280px] h-[70px]">
          <img src="/logo.png" alt="" className="w-full object-cover" />
        </div>
        <div className="text-center">
          <span className="text-black text-lg font-normal font-pretendard leading-[28.80px]">
            예약하고, 탐색하고, 성장하는
            <br />
          </span>
          <span className="text-black text-lg font-semibold font-pretendard leading-[28.80px]">
            멀티 서비스 오피스
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-[10px]">
        <SignInButton />
        <SignUpButton />
      </div>

      <div className="text-center mt-[26px]">
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

export default SignHomePage;
