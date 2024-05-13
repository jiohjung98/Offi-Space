/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { SignupBtnStatus } from '@/models/signupBtnStatus';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { invertSecond } from '@/utils/invertSecond';
import { emailauthrequest, emailauthverify } from '@/api/auth/auth.post.api';
import { signError } from '@/constant/signError';

interface EmailCertificationProps {
  setStep: Dispatch<React.SetStateAction<number>>;
}

const EmailCertification = ({ setStep }: EmailCertificationProps) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailValid, setEmailValid] = useState(false);
  const [btnStatus, setBtnStatus] = useState<SignupBtnStatus>('FIRST');
  const [isRequest, setIsRequest] = useState(false);
  const [validNumber, setValidNumber] = useState<string>('');
  const [validTime, setValidTime] = useState<number>(300);
  const inputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  //추가
  const [errorMessage, setErrorMessage] = useState('');

  const { mutateAsync: emailRequest } = useMutation((email: string) => {
    return emailauthrequest({ emailAddress: email });
  });

  const { mutateAsync: emailVerify } = useMutation(
    ({ emailAddress, code }: { emailAddress: string; code: number }) => {
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

  useEffect(() => {
    startRef.current?.focus();
  }, []);

  useEffect(() => {
    if (emailValid) {
      setBtnStatus('SECOND');
    } else {
      setBtnStatus('FIRST');
    }
  }, [emailValid]);

  useEffect(() => {
    if (isRequest) {
      inputRef.current?.focus();
    }
  }, [isRequest]);

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
          code: Number(validNumber)
        })) as { status: string };

        if (status == 'SUCCESS') {
          setStep((prev) => prev + 1);
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
          가입한 이메일을 <br />
          입력해주세요.
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
        <div className="mt-[70px] border-b border-neutral-300 ml-4">
          <div className="flex mb-[13px]">
            <label
              htmlFor="email"
              className="text-neutral-600 text-base font-semibold font-pretendard">
              이메일
            </label>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          </div>
          <div className="pb-2 flex">
            <div className="flex-grow flex items-center">
              <input
                id="email"
                style={{ backgroundColor: isRequest ? 'white' : '' }}
                disabled={isRequest}
                type="text"
                className="outline-none"
                placeholder="이메일을 입력해주세요."
                value={userEmail}
                onChange={handleEmailChange}
                ref={startRef}
                autoComplete="off"
              />
            </div>
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
        {errorMessage != '' && isRequest === false ? (
          <div className="flex ml-4">
            <div className="text-red-700 text-xs font-normal font-pretendard leading-tight">
              {errorMessage}
            </div>
          </div>
        ) : (
          ''
        )}
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
          <div className="mt-[48px] border-b border-neutral-300 ml-4">
            {errorMessage != '' ? (
              <div className="flex flex-row-reverse">
                <div className="text-red-700 text-xs font-normal font-pretendard leading-tight">
                  {errorMessage}
                </div>
              </div>
            ) : (
              <div className="pt-[15px]" />
            )}
            <div className="pb-2 flex">
              <div className="flex-grow flex">
                <input
                  disabled={validTime == 0}
                  type="tel"
                  maxLength={6}
                  className="outline-none"
                  placeholder="6자리 숫자 입력 "
                  ref={inputRef}
                  value={validNumber}
                  onChange={handleValidNumberChange}
                />
              </div>
              <div className="text-red-700 text-base font-medium font-pretendard">
                {invertSecond(validTime)}
              </div>
            </div>
          </div>
          <div className="flex items-center  mt-2 gap-2 ml-4">
            <div className="w-3.5 h-3.5 relative">
              <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-slate-200 rounded-full">
                <img src="/sign/emailerror.png" alt="" />
              </div>
            </div>
            <div className="text-neutral-400 text-sm font-normal font-pretendard leading-tight">
              이메일로 발송된 코드를 입력해주세요.
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmailCertification;
