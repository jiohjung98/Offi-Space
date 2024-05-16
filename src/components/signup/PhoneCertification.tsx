import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { SignupBtnStatus } from '@/models/signupBtnStatus';
import { motion } from 'framer-motion';
import { invertSecond } from '@/utils/invertSecond';
import { useMutation } from 'react-query';
import { phoneauthrequest, phoneauthverify } from '@/api/auth/auth.post.api';
import { ApplyValues } from '@/models/applyValues';
import { signError } from '@/constant/signError';
/* eslint-disable no-unused-vars */
interface PhoneCertificationProps {
  onNext: (phoneNumber: ApplyValues['memberPhone']) => void;
}

const PhoneCertification = ({ onNext }: PhoneCertificationProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [btnStatus, setBtnStatus] = useState<SignupBtnStatus>('FIRST');
  const [isRequest, setIsRequest] = useState(false);
  const [validNumber, setValidNumber] = useState<string>('');
  const [validTime, setValidTime] = useState<number>(300);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: phoneRequest } = useMutation((number: string) => {
    return phoneauthrequest({
      phoneNumber: number
    });
  });

  const { mutateAsync: phoneVerify } = useMutation(
    ({ phoneNumber, code }: { phoneNumber: string; code:string }) => {
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
        const { status } = (await phoneRequest(phoneNumber.replace(/-/g, ''))) as {
          status: string;
        };
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
          setPhoneNumber('');
          setBtnStatus('FIRST');
          startRef.current?.focus();
          return;
        }
      }
    }

    if (btnStatus == 'THIRD') {
      if (validNumber.length != 6) {
        console.log(validNumber)
        
        setValidNumber('');
        setErrorMessage('6자리 코드를 입력해주세요.');
        inputRef.current?.focus();
        return;
      }
      try {
        const { status } = await phoneVerify({
          phoneNumber: phoneNumber.replace(/-/g, ''),
          code: validNumber
        });

        if (status == 'SUCCESS') {
          onNext(phoneNumber);
        }
      } catch (error: any) {
        const errorResponse = error.response.data;
        const errorCode = errorResponse.errorCode;
        const select = signError.find((item) => item.errorCode === errorCode);
        if (select) {
          setErrorMessage(select.message);
          console.log(validNumber);
          console.log(parseInt(validNumber, 10));
          console.log(Number(validNumber));
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
          delay: 0.2
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}>
        <div className="ml-4 mb-[50px]">
          <span className="text-space-purple text-[16.80px] font-bold font-pretendard">
            1
          </span>
          <span className="text-black text-[16.80px] font-medium font-pretendard">
            {' '}
            /{' '}
          </span>
          <span className="text-black text-[16.80px] font-medium font-pretendard">
            3 단계
          </span>
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
          {errorMessage != '' ? (
            <div className="text-red-700 font-semibold font-pretendard text-xs">
              {errorMessage}
            </div>
          ) : (
            ''
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PhoneCertification;
