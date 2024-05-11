import MainContainer from '@/components/shared/MainContainer';
import EmailVerification from '@/components/signup/EmailVerification';
import PasswordVerification from '@/components/signup/PasswordVerification';
import PhoneCertification from '@/components/signup/PhoneCertification';
import { ApplyValues } from '@/models/applyValues';
import { useState } from 'react';

const SignUpPage = () => {
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    step: 0
  });

  console.log(applyValues);

  const handlePhoneNumber = (phoneNumber: ApplyValues['memberPhone']) => {
    setApplyValues((prev) => ({
      ...prev,
      phoneNumber: phoneNumber,
      step: (prev.step as number) + 1
    }));
  };

  const handleNameAndEmail = (
    name: ApplyValues['memberName'],
    email: ApplyValues['memberEmail']
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      memberName: name,
      memberEmail: email,
      step: (prev.step as number) + 1
    }));
  };

  const handleRemainData = (
    password: ApplyValues['memberPassword'],
    job: ApplyValues['memberJob'],
    smsAgree: ApplyValues['memberSmsAgree']
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      memberPassword: password,
      memberJob: job,
      memberSmsAgree: smsAgree,
      step: (prev.step as number) + 1
    }));
  };

  return (
    <MainContainer>
      {applyValues.step === 0 ? <PhoneCertification onNext={handlePhoneNumber} /> : null}
      {applyValues.step === 1 ? <EmailVerification onNext={handleNameAndEmail} /> : null}
      {applyValues.step === 2 ? (
        <PasswordVerification onNext={handleRemainData} applyValues={applyValues} />
      ) : null}
    </MainContainer>
  );
};

export default SignUpPage;
