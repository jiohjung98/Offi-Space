/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { useMutation } from 'react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { emailauthrequest, emailauthverify } from '../../api/auth/auth.post.api';
import { ApplyValues } from '@/models/applyValues';

interface EmailVerification {
  onNext: (name: ApplyValues['memberName'], email: ApplyValues['memberEmail']) => void;
}

const EmailVerification = ({ onNext }: EmailVerification) => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailValid, setEmailValid] = useState(false);
  const [validNumber, setValidNumber] = useState<string>('');
  const [validTime, setValidTime] = useState<number>(300);
  const [isError, setIsError] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const startRef = useRef<HTMLInputElement>(null);
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isPartnerShip, setIsPartnerShip] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const { mutateAsync: emailRequest } = useMutation((email: string) => {
    return emailauthrequest({ emailAddress: email });
  });

  const { mutateAsync: emailVerify } = useMutation(
    ({ emailAddress, code }: { emailAddress: string; code: number }) => {
      return emailauthverify({ emailAddress, code });
    }
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isValid = emailRegEx.test(e.target.value);
    setEmailValid(isValid);
    setIsPartnerShip(false);
  };

  const handleValidNumberChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value.replace(/[^0-9]/g, '');
    setValidNumber(regex);

    if (regex.length === 6) {
      try {
        const { status } = (await emailVerify({
          emailAddress: userEmail,
          code: Number(regex)
        })) as unknown as { status: string };

        if (status === 'SUCCESS') {
          console.log('인증 성공');
          console.log(status);
          onNext(userName, userEmail);
        }
      } catch (error: any) {
        console.error(error);
        const errorResponse = error.response.data;
        const errorCode = errorResponse.errorCode;
        console.log('인증 실패 - 에러 코드:', errorCode);

        if (errorCode === '1-005') {
          setIsInvalidCode(true);
        }
      }
    }
  };

  const handleRetryClick = async () => {
    try {
      await emailRequest(userEmail);
      setShowVerification(true);
      setValidTime(300);
      setTimerExpired(false);
    } catch (error: any) {
      if (error.response.data.errorCode === '1-003') {
        setIsPartnerShip(true);
      }
      setIsError(true);
    }
  };

  useEffect(() => {
    startRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isError) {
      const timeoutId = setTimeout(() => {
        setIsError(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [isError]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (validTime > 0) {
      intervalId = setInterval(() => {
        setValidTime((prevTime) => {
          if (prevTime === 1) {
            setTimerExpired(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [validTime]);

  return (
    <div className="max-w-[360px] mx-auto">
      <ToBack />
      <motion.div
        initial={{ opacity: 0, translateX: -90 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          delay: 0.3
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}>
        <div className="text-black text-[22px] font-semibold font-pretendard leading-[30.80px] mt-[24px] ml-4">
          제휴 기업이라면,
          <br />
          사내 이메일을 인증해주세요.
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateX: -90 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          delay: 0.6
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}>
        <div className="mt-[62px] ml-4 border-b border-neutral-300">
          <div className="flex">
            <label
              htmlFor="name"
              className="text-neutral-600 text-base font-semibold font-pretendard">
              이름
            </label>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
          </div>
          <div className="mt-[13px] flex">
            <div className="flex-grow flex items-center">
              <input
                id="name"
                type="text"
                className="outline-none w-full"
                placeholder="이름을 입력해주세요."
                value={userName}
                onChange={handleNameChange}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateX: -90 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          delay: 0.6
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}>
        <div className="mt-[37px] ml-4 border-b border-neutral-300">
          <div className="flex items-center">
            <div className="flex">
              <label
                htmlFor="email"
                className="text-neutral-600 text-base font-semibold font-pretendard">
                이메일
              </label>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
            </div>
            {userEmail && !emailValid && (
              <div className="text-red-700 font-semibold font-pretendard text-xs ml-auto">
                *이메일 형식에 맞지 않습니다.
              </div>
            )}
            {isPartnerShip && !timerExpired && (
              <div className="text-red-700 font-semibold font-pretendard text-xs ml-auto">
                계약되지 않은 회사입니다.
              </div>
            )}
          </div>
          <div className="mt-[13px] flex">
            <div className="flex-grow flex items-center">
              <input
                id="email"
                type="email"
                className="outline-none w-full"
                placeholder="이메일을 입력해주세요."
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex items-center ml-4">
              <button
                className={`w-[83px] h-[31px] px-3.5 py-1.5 mb-1 rounded border justify-center items-center gap-2.5 flex text-center text-sm font-medium font-pretendard ${
                  emailValid
                    ? 'bg-indigo-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!emailValid}
                onClick={handleRetryClick}>
                {showVerification ? '재요청' : '중복확인'}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[15px] ml-4 flex">
          <Image
            src="/ExclamationMark.svg"
            alt="ExclamationMark Logo"
            className="mb-auto"
            width={14}
            height={14}
          />
          <div className="ml-[8px] text-zinc-400 text-xs font-normal font-['Pretendard'] leading-tight">
            본인 인증, 예약 확인, 약관 변경 안내 등을 위해 사용됩니다.
            <br />
            사내 이메일로 정확하게 입력해주세요.
          </div>
        </div>
      </motion.div>
      {showVerification && (
        <motion.div
          initial={{ opacity: 0, translateX: -90 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
            delay: 0.6
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}>
          <div className="mt-[37px] ml-4 border-b border-neutral-300">
            <div className="flex items-center">
              <div className="flex">
                <label
                  htmlFor="verificationCode"
                  className="text-neutral-600 text-base font-semibold font-pretendard">
                  인증코드
                </label>
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
              </div>
              {isInvalidCode && !timerExpired && (
                <div className="text-red-700 font-semibold font-pretendard text-xs ml-auto">
                  올바르지 않은 코드입니다.
                </div>
              )}
              {timerExpired && (
                <div className="text-red-700 font-semibold font-pretendard text-xs ml-auto">
                  인증 시간이 초과되었습니다.
                </div>
              )}
            </div>
            <div className="mt-[13px] flex">
              <div className="flex-grow flex items-center">
                <input
                  id="verificationCode"
                  type="text"
                  className="outline-none w-full"
                  placeholder="인증코드를 입력해주세요."
                  value={validNumber}
                  onChange={handleValidNumberChange}
                  maxLength={6}
                />
              </div>
              <div className="flex items-center ml-4 text-indigo-600 text-xs font-semibold font-pretendard">
                {Math.floor(validTime / 60)}:
                {validTime % 60 < 10 ? `0${validTime % 60}` : validTime % 60}
              </div>
            </div>
          </div>
          <div className="mt-[15px] ml-4 flex">
            <Image
              src="/ExclamationMark.svg"
              alt="ExclamationMark Logo"
              className="mb-auto"
              width={14}
              height={14}
            />
            <div className="ml-[8px] text-zinc-400 text-xs font-normal font-['Pretendard'] leading-tight">
              이메일로 발송된 코드를 입력해주세요.
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmailVerification;
