import React, { Dispatch } from 'react';
import ToBack from '../shared/sign/ToBack';
import NewPasswordForm from './NewPasswordForm';

const SetNewPassword = ({
  setStep
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="max-w-[360px] mx-auto">
      <ToBack />
      <div className="text-black text-[22px] font-semibold font-pretendard leading-[30.80px] mt-[24px] ml-4">
        새로 사용할 <br />
        비밀번호를 설정해주세요.
      </div>
      <NewPasswordForm setStep={setStep} />
    </div>
  );
};

export default SetNewPassword;
