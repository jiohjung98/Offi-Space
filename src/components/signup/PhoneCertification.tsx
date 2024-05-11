import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { SignupBtnStatus } from '@/models/signupBtnStatus';
import { motion } from 'framer-motion';
import { invertSecond } from '@/utils/invertSecond';
import { useMutation } from 'react-query';
import { phoneauthrequest, phoneauthverify } from '@/api/auth/auth.post.api';
import EmailVerification from './EmailVerification';

const PhoneCertification = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [btnStatus, setBtnStatus] = useState<SignupBtnStatus>('FIRST');
  const [isRequest, setIsRequest] = useState(false);
  const [validNumber, setValidNumber] = useState<string>('');
  const [validTime, setValidTime] = useState<number>(180);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const [showEmailPosition, setShowEmailPosition] = useState(false);

  const { mutateAsync: phoneRequest } = useMutation((number: string) => {
    return phoneauthrequest({
      phoneNumber: number
    });
  });

  const { mutateAsync: phoneVerify } = useMutation(
    ({ phoneNumber, code }: { phoneNumber: string; code: number }) => {
      return phoneauthverify({ phoneNumber, code });
    }
  );

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    setPhoneNumber(regex);
  };

  const handleValidNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value.replace(/[^0-9]/g, '');
    setValidNumber(regex);
  };

  useEffect(() => {
    startRef.current?.focus();
  }, []);

  useEffect(() => {
    if (phoneNumber.length === 13) {
      setBtnStatus('SECOND');
    } else {
      setBtnStatus('FIRST');
    }
  }, [phoneNumber]);

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
      }, 3000);
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

  const handleClick = async () => {
    if (btnStatus == 'SECOND') {
      const { status } = (await phoneRequest(phoneNumber.replace(/-/g, ''))) as {
        status: string;
      };
      if (status == 'SUCCESS') {
        setIsRequest(true);
        setBtnStatus('THIRD');
      }
    }
    if (btnStatus == 'THIRD') {
      if (validNumber.length != 6) {
        setValidNumber('');
        setIsError(true);
        inputRef.current?.focus();
        return;
      }
      const { status } = (await phoneVerify({
        phoneNumber: phoneNumber.replace(/-/g, ''),
        code: Number(validNumber)
      })) as { status: string };

      if (status == 'SUCCESS') {
        console.log('핸드폰 인증 성공');
        setShowEmailPosition(true);
      }

      if (status == 'FAIL') {
        console.log('핸드폰 인증 실패')
        //todo : 에러코드에 따른 텍스트 조건부 렌더링
        alert('실패');
      }
    }
  };

  return (
    <div className="max-w-[360px] mx-auto">
      {!showEmailPosition && (
        <>
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
              본인인증을 위해 <br />
              휴대폰 번호를
              <br />
              인증해주세요.
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
            <div className="mt-[70px] border-b border-neutral-300">
              <div className="pb-2 flex">
                <div className="flex justify-center items-center">+82</div>
                <div className="flex-grow flex justify-center items-center">
                  <input
                    style={{ backgroundColor: isRequest ? 'white' : '' }}
                    disabled={isRequest}
                    type="tel"
                    maxLength={13}
                    className="outline-none"
                    placeholder="010-0000-0000 "
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    ref={startRef}
                  />
                </div>
                <button
                  disabled={btnStatus == 'FIRST'}
                  className={`w-[83px] h-[31px] px-3.5 py-1.5 rounded border justify-center items-center gap-2.5 flex text-center text-sm font-normal font-pretendard ${btnStatus === 'FIRST'
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
              <div className="mt-[48px] border-b border-neutral-300">
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
              {isError ? (
                <div className="text-red-700 font-semibold font-pretendard text-xs">
                  *올바르지 않은 코드입니다.
                </div>
              ) : (
                ''
              )}
            </>

          )}
        </>
      )}
      {showEmailPosition && (
        <EmailVerification />
      )}
    </div>
  );
};

export default PhoneCertification;
