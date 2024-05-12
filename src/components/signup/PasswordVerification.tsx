import React, { SetStateAction, useEffect, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import Image from 'next/image';
import { ApplyValues } from '@/models/applyValues';
import dynamic from 'next/dynamic';
import Terms from './Terms';
import { JobPositionType } from '@/models/jobPosition';
import { jobPosition } from '@/constant/jobPosition';

const JobPosition = dynamic(() => import('./JobPosition'), {
  ssr: false
});

interface PasswordVerificationProps {
  onNext: (
    password: ApplyValues['memberPassword'],
    job: ApplyValues['memberJob'],
    smsAgree: ApplyValues['memberSmsAgree']
  ) => void;
  applyValues: Partial<ApplyValues>;
}

const PasswordVerification = ({ onNext, applyValues }: PasswordVerificationProps) => {
  const [password, setPassword] = useState(''); //유저 비밀번호
  const [passwordError, setPasswordError] = useState(false);

  const [selectedJob, setSelectedJob] = useState<string>(''); //유저 직무
  const [jobModal, setJobModal] = useState(false); //직무 모달 오픈 상태
  const [completedJob, setCompletedJob] = useState<JobPositionType>('');

  const [isSmsAgree, setIsSmsAgree] = useState(false); //sms 동의 체크여부
  const [isAllAgreeChecked, setIsAllAgreeChecked] = useState(false); //모두동의했는가

  const [isAllDataValid, setIsAllDataValid] = useState(false); // 모두동의 job선택됨 비밀번호 통과

  useEffect(() => {
    if (isAllAgreeChecked && selectedJob != '' && !passwordError && password != '') {
      setIsAllDataValid(true);
    } else {
      setIsAllDataValid(false);
    }
  }, [isAllAgreeChecked, selectedJob, passwordError, password]);

  useEffect(() => {
    const result = jobPosition.find((job) => job.title === selectedJob);
    if (result) {
      setCompletedJob(result.description as SetStateAction<JobPositionType>);
    }
  }, [selectedJob]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const checkValidPassword = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleCompleteClick = () => {
    onNext(password, completedJob, isSmsAgree);
  };

  if (jobModal) {
    return (
      <JobPosition
        selectedJob={selectedJob}
        setJobModal={setJobModal}
        setSelectedJob={setSelectedJob}
      />
    );
  }

  return (
    <div className="max-w-[360px] mx-auto">
      <ToBack />

      <div className="text-black text-[22px] font-semibold font-pretendard leading-[30.80px] mt-[24px] ml-4">
        회원가입을 위한
        <br />
        정보를 입력해주세요.
      </div>
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
              value={applyValues.memberName}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="mt-[36px] ml-4 border-b border-neutral-300">
        <div className="flex items-center">
          <div className="flex">
            <label
              htmlFor="email"
              className="text-neutral-600 text-base font-semibold font-pretendard">
              이메일
            </label>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
          </div>
        </div>
        <div className="mt-[13px] flex">
          <div className="flex-grow flex items-center">
            <input
              id="email"
              type="email"
              className="outline-none w-full"
              value={applyValues.memberEmail}
              readOnly={true}
            />
          </div>
          <div className="flex items-center ml-4">
            <button
              className="w-[83px] h-[31px] px-3.5 py-1.5 mb-1 rounded border justify-center items-center gap-2.5 flex text-center text-sm font-medium font-pretendard"
              disabled>
              인증 완료
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
      <div className="mt-[36px] ml-4 border-b border-neutral-300">
        <div className="flex">
          <label
            htmlFor="password"
            className="text-neutral-600 text-base font-semibold font-pretendard">
            비밀번호
          </label>
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
          {passwordError && (
            <div className="text-red-700 font-semibold font-pretendard text-xs ml-auto">
              *비밀번호 형식을 확인해주세요.
            </div>
          )}
        </div>
        <div className="mt-[13px] flex">
          <div className="flex-grow flex items-center">
            <input
              id="password"
              type="password"
              className="outline-none w-full"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={handlePasswordChange}
              onBlur={checkValidPassword}
            />
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
          *영문 (대문자 포함), 숫자, 특수문자 중 2가지 이상 조합 8~16자리
        </div>
      </div>
      <div className="mt-[36px] ml-4 border-b border-neutral-300">
        <div className="flex">
          <label
            htmlFor="job"
            className="text-neutral-600 text-base font-semibold font-pretendard">
            직무
          </label>
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
        </div>
        <div className="mt-[8px] flex">
          <div className="flex-grow flex items-center">
            <input
              id="job"
              type="text"
              className="outline-none w-full cursor-pointer"
              placeholder="직무를 목록에서 선택해주세요."
              onClick={() => setJobModal(true)}
              value={selectedJob == '' ? '' : selectedJob}
              readOnly={selectedJob == ''}
            />
          </div>
          <Image
            src="/DropDown.svg"
            alt="DropDown Logo"
            className="mr-[10px]"
            width={14}
            height={7}
          />
        </div>
      </div>
      <Terms setIsSmsAgree={setIsSmsAgree} setIsAllAgreeChecked={setIsAllAgreeChecked} />
      <div className="w-full flex justify-center items-center mx-auto mb-6">
        <button
          disabled={!isAllDataValid}
          className={`mt-[55px] w-[361px] h-12 px-3.5 rounded-lg  justify-center items-center inline-flex text-[15px] font-semibold font-pretendard leading-snug
     ${!isAllDataValid ? 'border border-black text-black bg-white' : 'bg-space-purple text-white'}
     `}
          type="submit"
          onClick={handleCompleteClick}>
          다음
        </button>
      </div>
    </div>
  );
};

export default PasswordVerification;
