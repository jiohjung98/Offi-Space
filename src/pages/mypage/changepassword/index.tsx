/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { passwordverify } from '@/api/auth/auth.post.api';
import { useMutation } from '@tanstack/react-query';
import { changepassword } from '@/api/auth/auth.patch.api';
import { useRouter } from 'next/navigation';
import { BackArrow } from '@/components/sign/backarrow/BackArrow';
import SEO from '@/components/shared/SEO';

export default function PasswordChange() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm({ mode: 'onChange' });
  const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false);
  const [passwordVerifiedButton, setPasswordVerifiedButton] = useState('확인');
  const router = useRouter();
  const onSubmit = async (data: any) => {
    changepassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    });
    router.push('/mypage/changepassword/success');
  };

  const usePasswordVerify = () => {
    const onSuccess = () => {
      setCurrentPasswordVerified(true);
      setPasswordVerifiedButton('확인완료');
    };
    const onError = () => {
      setError('currentPassword', {
        type: 'manual',
        message: '*일치하지 않습니다.'
      });
    };
    return useMutation({
      mutationFn: passwordverify,
      onSuccess: onSuccess,
      onError: onError
    });
  };

  const { mutate } = usePasswordVerify();

  const verifyCurrentPassword = () => {
    mutate({ password: watch('currentPassword') });
  };

  const newPassword = watch('newPassword');
  const newPasswordConfirm = watch('newPasswordConfirm');

  const isNextButtonEnabled =
    currentPasswordVerified && newPassword && newPassword === newPasswordConfirm;
  return (
    <>
      <SEO title="Offispace | 비밀번호 변경" />
      <div className="flex items-center justify-center w-full ">
        <div className="w-full max-w-md flex flex-col items-center justify-center ]">
          <div className="w-full  bg-white p-6 rounded-lg">
            {/* <Link href="/mypage">
          <img
            src="/mypage/passwordchange/BackArrow.svg"
            alt="Back"
            className="mb-10 cursor-pointer mt-[50px]"
          />
        </Link> */}

            <BackArrow width="40px" height="24px" />
            <h2 className=" mt-[23px] text-2xl font-bold ">새로 사용할 </h2>
            <h2 className="text-2xl font-bold mb-[62px]"> 비밀번호를 설정해주세요. </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="">
              {/* Current Password Field */}
              <div className="mb-[24px]">
                <label className="  text-neutral-600 text-base font-semibold mb-2 flex flex-row justify-start">
                  <div className="">기존 비밀번호</div>

                  <img
                    src="/mypage/passwordchange/YellowEllipse.svg"
                    alt="Required"
                    className="inline ml-1 w-2 h-2"
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 mt-1 text-xs  ml-[120px]">
                      {errors.currentPassword.message as string}
                    </p>
                  )}
                </label>

                <div className="flex items-center border-b border-gray-300">
                  <input
                    type="password"
                    className="w-full px-1 py-2 bg-transparent outline-none placeholder-gray-400"
                    placeholder="기존 비밀번호를 인증해 주세요."
                    {...register('currentPassword', {})}
                    disabled={currentPasswordVerified}
                  />

                  <button
                    type="button"
                    onClick={verifyCurrentPassword}
                    className={` h-[31px] px-3.5 py-1.5  rounded border justify-center items-center   border-neutral-300 gap-2.5 flex ${currentPasswordVerified ? 'w-[103px] bg-neutral-600' : 'w-[83px] bg-white rounded border border-neutral-300'} `}>
                    <div
                      className={` w-[60px] text-center text-zinc-400 text-sm font-light font-['Pretendard']`}>
                      {passwordVerifiedButton}
                    </div>
                  </button>
                </div>
              </div>

              {/* New Password Field */}
              <div className="mb-[24px]">
                <label className="flex flex-row justify-start text-neutral-600 text-base font-semibold mb-2">
                  새 비밀번호
                  <img
                    src="/mypage/passwordchange/YellowEllipse.svg"
                    alt="Required"
                    className="inline ml-1 w-2 h-2 mb-3"
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 mt-1 text-xs ml-[90px] ">
                      {errors.newPassword.message as string}
                    </p>
                  )}
                </label>
                <div className="flex items-center border-b border-gray-300">
                  <input
                    type="password"
                    className="w-full px-1 py-2 bg-transparent outline-none placeholder-gray-400"
                    placeholder="사용할 비밀번호를 입력해 주세요."
                    {...register('newPassword', {
                      // minLength: { value: 8, message: '비밀번호는 8자리 이상이어야 합니다.' },
                      pattern: {
                        value:
                          /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,16}$/,
                        message: '*조건에 충족되지 않습니다'
                      }
                    })}
                    disabled={!currentPasswordVerified}
                  />
                </div>

                <p className="text-gray-500 text-xs mt-1">
                  <img
                    src="/mypage/passwordchange/WarnEllipse.svg"
                    alt="Warning"
                    className="inline mr-1 w-3 h-3"
                  />
                  영문, 숫자, 특수문자 중 2가지 이상 조합 8-16자리
                </p>
              </div>

              {/* Confirm New Password Field */}
              <div className="mb-[24px]">
                <label className="flex flex-row justify-start  text-neutral-600 text-base font-semibold mb-2">
                  새 비밀번호 확인
                  <img
                    src="/mypage/passwordchange/YellowEllipse.svg"
                    alt="Required"
                    className="inline ml-1 w-2 h-2"
                  />
                  {errors.newPasswordConfirm && (
                    <p className="text-red-500 mt-1 text-xs ml-[100px]">
                      {errors.newPasswordConfirm.message as string}
                    </p>
                  )}
                </label>
                <div className="flex items-center border-b border-gray-300">
                  <input
                    type="password"
                    className="w-full px-1 py-2 bg-transparent outline-none placeholder-gray-400"
                    placeholder="위와 같은 비밀번호를 입력해 주세요."
                    {...register('newPasswordConfirm', {
                      validate: (value) =>
                        value === watch('newPassword') || '*일치하지 않습니다.'
                    })}
                    disabled={!currentPasswordVerified}
                  />
                </div>
              </div>

              {/* Next Button */}

              <button
                type="submit"
                className={`w-full h-12  mt-[150px] rounded-lg border border-neutral-300  text-white ${isNextButtonEnabled ? 'bg-indigo-700' : 'bg-white'}`}
                disabled={!isNextButtonEnabled}>
                <div
                  className={`text-center  text-[15px] font-normal font-['Pretendard'] leading-snug ${isNextButtonEnabled ? 'text-white' : 'text-zinc-400'}`}>
                  다음
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
