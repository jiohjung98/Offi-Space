import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { useMutation } from 'react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { emailauthrequest, emailauthverify } from '../../api/auth/auth.post.api';
import { ApplyValues } from '@/models/applyValues';
import { invertSecond } from '@/utils/invertSecond';
import { SignupBtnStatus } from '@/models/signupBtnStatus';
import { signError } from '@/constant/signError';
/* eslint-disable no-unused-vars */
interface EmailVerification {
  onNext: (name: ApplyValues['memberName'], email: ApplyValues['email']) => void;
}

const EmailVerification = ({ onNext }: EmailVerification) => {
  const [userName, setUserName] = useState<string>(''); //유저 이름 입력
  const [userEmail, setUserEmail] = useState<string>(''); //유저 이메일 입력
  const [emailValid, setEmailValid] = useState(false); //email valid 상태
  const [validNumber, setValidNumber] = useState<string>('');
  const [validTime, setValidTime] = useState<number>(300);
  const [btnStatus, setBtnStatus] = useState<SignupBtnStatus>('FIRST');
  const [isRequest, setIsRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const startRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: emailRequest } = useMutation((email: string) => {
    return emailauthrequest({ emailAddress: email });
  });

  const { mutateAsync: emailVerify } = useMutation(
    ({ emailAddress, code }: { emailAddress: string; code: string }) => {
      return emailauthverify({ emailAddress, code });
    }
  );

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isValid = emailRegEx.test(e.target.value);
    setEmailValid(isValid);
  };

  const handleValidNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value.replace(/[^0-9]/g, '');
    setValidNumber(regex);
  };

  const handleClick = async () => {
    if (btnStatus == 'SECOND') {
      try {
        const { status } = await emailRequest(userEmail);
        if (status == 'SUCCESS') {
          setIsRequest(true);
          setBtnStatus('THIRD');
        }
      } catch (error: any) {
        const errorResponse = error.response.data;
        const errorCode = errorResponse.errorCode;
        const select = signError.find((item) => item.errorCode === errorCode);
        if (select) {
          setErrorMessage(select.message);
          setUserEmail('');
          setBtnStatus('FIRST');
          startRef.current?.focus();
          return;
        }
      }
    }
    if (btnStatus == 'THIRD') {
      if (validNumber.length != 6) {
        setValidNumber('');
        setErrorMessage('6자리 코드를 입력해주세요.');
        inputRef.current?.focus();
        return;
      }
      try {
        const { status } = (await emailVerify({
          emailAddress: userEmail,
          code: validNumber
        })) as { status: string };

        if (status == 'SUCCESS') {
          onNext(userName, userEmail);
        }
      } catch (error: any) {
        const errorResponse = error.response.data;
        const errorCode = errorResponse.errorCode;
        const select = signError.find((item) => item.errorCode === errorCode);
        if (select) {
          setErrorMessage(select.message);
          setValidNumber('');
          inputRef.current?.focus();
          return;
        }
      }
    }
  };

  useEffect(() => {
    if (emailValid) {
      setBtnStatus('SECOND');
    } else {
      setBtnStatus('FIRST');
    }
  }, [emailValid]);

  useEffect(() => {
    startRef.current?.focus();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (errorMessage != '') {
      timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRequest && validTime > 0) {
      intervalId = setInterval(() => {
        setValidTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRequest, validTime]);

  return (
    <div className="max-w-[360px] mx-auto">
      <ToBack />
      <motion.div
        initial={{ opacity: 0, translateX: -90 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          delay: 0.2
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}>
        <div className="ml-4 mb-[50px] flex gap-[12px]">
          <div>
            <span className="text-space-purple text-[16.80px] font-bold font-pretendard">
              2
            </span>
            <span className="text-black text-[16.80px] font-medium font-pretendard">
              {' '}
              /{' '}
            </span>
            <span className="text-black text-[16.80px] font-medium font-pretendard">
              3 단계
            </span>
          </div>
          <div className="w-[152.40px] h-[25.20px] bg-indigo-700 flex justify-center items-center">
            <div className="text-center text-white text-sm font-medium font-pretendard">
              한번 더 확인이 필요해요.
            </div>
          </div>
        </div>
      </motion.div>

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
          <div className="mt-[13px] flex mb-2">
            <div className="flex-grow flex items-center">
              <input
                id="name"
                type="text"
                className="outline-none w-full"
                placeholder="이름을 입력해주세요."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                ref={startRef}
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
          <div className="flex items-center justify-between">
            <div className="flex">
              <label
                htmlFor="email"
                className="text-neutral-600 text-base font-semibold font-pretendard">
                이메일
              </label>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
            </div>
            {errorMessage != '' && isRequest === false ? (
              <div className="flex ml-4">
                <div className="text-red-700 text-xs font-normal font-pretendard leading-tight">
                  {errorMessage}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="mt-[13px] flex ">
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
            <div className="flex items-center ml-4 mb-2">
              <button
                disabled={btnStatus == 'FIRST'}
                className={`w-[83px] h-[31px] px-3.5 py-1.5 rounded border justify-center items-center gap-2.5 flex text-center text-sm font-normal font-pretendard ${
                  btnStatus === 'FIRST'
                    ? 'bg-white text-zinc-400'
                    : 'bg-space-purple text-white'
                }`}
                onClick={handleClick}>
                {btnStatus == 'THIRD' ? '인증확인' : '인증전송'}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[8px] ml-4 flex">
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
      {isRequest && (
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
            <div className="flex items-center justify-between">
              <div className="flex">
                <label
                  htmlFor="verificationCode"
                  className="text-neutral-600 text-base font-semibold font-pretendard">
                  인증코드
                </label>
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
              </div>
              {errorMessage != '' ? (
                <div className="flex flex-row-reverse">
                  <div className="text-red-700 text-xs font-normal font-pretendard leading-tight">
                    {errorMessage}
                  </div>
                </div>
              ) : null}
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
                  ref={inputRef}
                />
              </div>
              <div className="text-red-700 text-base font-medium font-pretendard">
                {invertSecond(validTime)}
              </div>
            </div>
          </div>
          <div className="mt-[8px] ml-4 flex mb-8">
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
