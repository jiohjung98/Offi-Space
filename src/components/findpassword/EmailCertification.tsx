import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { SignupBtnStatus } from '@/models/signupBtnStatus';
import { motion } from 'framer-motion';

const EmailCertification = ({
  setStep
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
}) => {
  const [userEmail, setUserEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [btnStatus, setBtnStatus] = useState<SignupBtnStatus>('FIRST');
  const [isRequest, setIsRequest] = useState(false);
  const [validNumber, setValidNumber] = useState<string>('');
  const [validTime, setValidTime] = useState<number>(300);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
    if (isError) {
      timeoutId = setTimeout(() => {
        setIsError(false);
      }, 4000);
    }
    return () => clearTimeout(timeoutId);
  }, [isError]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRequest && validTime > 0) {
      intervalId = setInterval(() => {
        setValidTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRequest, validTime]);

  const handleClick = () => {
    if (btnStatus == 'SECOND') {
      //todo 인증 전송 로직 추가
      setIsRequest(true);
      setBtnStatus('THIRD');
    }
    if (btnStatus == 'THIRD') {
      if (validNumber.length != 6) {
        setValidNumber('');
        setIsError(true);
        inputRef.current?.focus();
        return;
      }
      // todo validNumber 인증 확인 로직 추가
      alert('인증 로직 시작');
      setStep((prev) => prev + 1);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
      </motion.div>

      {isRequest && (
        <>
          <div className="mt-[48px] border-b border-neutral-300 ml-4">
            {isError ? (
              <div className="flex flex-row-reverse">
                <div className="text-red-700 text-xs font-normal font-pretendard leading-tight">
                  *올바르지 않은 코드입니다.
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
                {formatTime(validTime)}
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
        </>
      )}
    </div>
  );
};

export default EmailCertification;
