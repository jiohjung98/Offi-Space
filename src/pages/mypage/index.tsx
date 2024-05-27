import { jobPosition, getTitleFromDescription } from '@/constant/jobPosition';
import { useMember } from '@/stores/user';
import Link from 'next/link';
import LogoutModal from '@/components/modal/logoutModal';
import { useState } from 'react';
import useLoggedOut from '@/hook/useLoggedOut';
import SuccessModal from '@/components/modal/successModal';
const MyPage = () => {
  const member = useMember();
  const job = getTitleFromDescription(jobPosition, member.memberJob);
  const [isModalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const logout = useLoggedOut();
  const handleLogout = () => {
    console.log('Logged out');
    setModalVisible(false);
    setSuccessModal(true);
    setTimeout(() => {
      logout();
    }, 2000);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-[102px]">
      <div className="flex flex-col justify-center items-center">
        <div>
          <img src="/mypage/ProfileImage.svg" />
        </div>
        <div className="w-[130px] h-[73px] flex flex-col justify-center items-center">
          <div className="h-14 flex flex-col justify-start items-start gap-2">
            <div className="w-[130px] text-center text-indigo-700 text-lg font-bold font-['Pretendard'] leading-[27px] mt-[8px]">
              {member.memberNickName}
            </div>
            <div className="w-[130px] text-center text-neutral-400 text-sm font-medium font-['Pretendard'] leading-[21px]">
              {job}
            </div>
          </div>
          <div className="text-neutral-400 text-sm font-normal font-['Pretendard']">
            {member.memberEmail}
          </div>
        </div>
      </div>
      <Link href="/mypage/changeprofile">
        <div>
          <div className="w-[361px] h-[42px] p-2 rounded-sm border border-zinc-400 flex justify-center items-center gap-2 mt-[32px]">
            <div className="text-black/opacity-20 text-base font-normal font-['Pretendard'] leading-normal">
              프로필 수정
            </div>
          </div>
        </div>
      </Link>

      <div className="w-[300px] flex justify-between items-center mt-[53.5px]">
        <Link href={'/mypage/guide'}>
          <div className="flex flex-col justify-center items-start">
            <div className="w-[70px] h-[78px] flex flex-col justify-start items-center">
              <div className="w-[70px] h-[54px] flex justify-center items-center gap-2">
                <div className="w-[43px] h-[43px] bg-indigo-50 rounded-full relative">
                  <img className="absolute top-1/4 left-[13px]" src="/mypage/Guide.svg" />
                </div>
              </div>
              <div className="w-[70px] flex justify-center items-center">
                <div className="opacity-70 text-black/opacity-20 text-base font-medium font-['Pretendard'] leading-normal">
                  이용가이드
                </div>
              </div>
            </div>
          </div>
        </Link>
        <img src="/mypage/Vector.svg" />
        <Link href={'/mypage/notice'}>
          <div className="flex flex-col justify-center items-start">
            <div className="w-[70px] h-[78px] flex flex-col justify-start items-center">
              <div className="w-[70px] h-[54px] flex justify-center items-center gap-2">
                <div className="w-[43px] h-[43px] bg-indigo-50 rounded-full relative">
                  <img className="absolute top-1/4 left-1/4" src="/mypage/Notice.svg" />
                </div>
              </div>
              <div className="w-[70px] flex justify-center items-center">
                <div className="opacity-70 text-black/opacity-20 text-base font-medium font-['Pretendard'] leading-normal">
                  공지사항
                </div>
              </div>
            </div>
          </div>
        </Link>

        <img src="/mypage/Vector.svg" />

        <div className="flex flex-col justify-center items-start">
          <div className="w-[70px] h-[78px] flex flex-col justify-start items-center">
            <div className="w-[70px] h-[54px] flex justify-center items-center gap-2">
              <div className="w-[43px] h-[43px] bg-indigo-50 rounded-full relative">
                <img className="absolute top-1/4 left-1/4" src="/mypage/Inquiry.svg" />
              </div>
            </div>
            <div className="w-[70px] flex justify-center items-center">
              <div className="opacity-70 text-black/opacity-20 text-base font-medium font-['Pretendard'] leading-normal">
                1:1문의
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[13px] bg-stone-50 mt-[36px] mb-[24px]" />

      <div className="w-[361px] h-[39px] pb-3 flex justify-start items-start gap-3.5">
        <div className="text-center text-neutral-800 text-lg font-semibold font-['Pretendard'] leading-[27px]">
          설정
        </div>
      </div>

      <div className="w-[361px] h-9 pb-3 flex justify-start items-center gap-[268px]">
        <div className="h-6 flex justify-start items-start gap-3.5">
          <div className="w-[360px] flex justify-between">
            <div className="text-center text-black/opacity-20 text-base font-normal font-['Pretendard'] leading-normal">
              알림 설정
            </div>
            <img className="mr-[16px]" src="/mypage/RightArrowIcon.svg" />
          </div>
        </div>
        <div className="w-1.5 h-3 relative" />
      </div>

      <div className="w-full h-[13px] bg-stone-50 mt-[24px] mb-[24px]" />

      <div className="w-[361px] h-[33px] pb-3 flex justify-start items-start gap-3.5">
        <div
          onClick={() => setModalVisible(true)}
          className="text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-[21px]">
          로그아웃
        </div>
      </div>
      {isModalVisible && <LogoutModal onConfirm={handleLogout} onCancel={handleCancel} />}
      {successModal && <SuccessModal />}
      <Link href={'/mypage/withdraw'}>
        <div className="w-[361px] h-[33px] pb-3 flex justify-start items-start gap-3.5">
          <div className="text-center text-neutral-800 text-sm font-semibold font-['Pretendard'] leading-[21px]">
            회원탈퇴
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MyPage;