import { signup } from '@/api/auth/auth.post.api';
import { ISignUp } from '@/api/types/auth';
import MainContainer from '@/components/shared/MainContainer';
import EmailVerification from '@/components/sign/signup/EmailVerification';
import PasswordVerification from '@/components/sign/signup/PasswordVerification';
import PhoneCertification from '@/components/sign/signup/PhoneCertification';
import SignupDone from '@/components/sign/signup/SignupDone';
import { ApplyValues } from '@/models/applyValues';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

const SignUpPage = () => {
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    step: 0
  });

  const { mutateAsync: signUpReq } = useMutation(
    ({
      email,
      password,
      memberName,
      memberJob,
      memberPhone,
      memberSmsAgree
    }: ISignUp) => {
      return signup({
        email,
        password,
        memberName,
        memberJob,
        memberPhone,
        memberSmsAgree
      });
    },
    {
      onSuccess: () =>
        setApplyValues((prev) => ({
          ...prev,
          step: (prev.step as number) + 1
        }))
    }
  );

  const handlePhoneNumber = (phoneNumber: ApplyValues['memberPhone']) => {
    setApplyValues((prev) => ({
      ...prev,
      memberPhone: phoneNumber,
      step: (prev.step as number) + 1
    }));
  };

  const handleNameAndEmail = (
    name: ApplyValues['memberName'],
    email: ApplyValues['password']
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      memberName: name,
      email: email,
      step: (prev.step as number) + 1
    }));
  };

  const handleRemainData = (
    password: ApplyValues['password'],
    job: ApplyValues['memberJob'],
    smsAgree: ApplyValues['memberSmsAgree']
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      password: password,
      memberJob: job,
      memberSmsAgree: smsAgree,
      step: (prev.step as number) + 1
    }));
  };

  useEffect(() => {
    if (applyValues.step === 3) {
      signUpReq({
        email: applyValues.email as string,
        password: applyValues.password as string,
        memberName: applyValues.memberName as string,
        memberJob: applyValues.memberJob as string,
        memberPhone: applyValues.memberPhone as string,
        memberSmsAgree: applyValues.memberSmsAgree as boolean
      });
    }
  }, [applyValues, signUpReq]);

  return (
    <MainContainer>
      {applyValues.step === 0 ? <PhoneCertification onNext={handlePhoneNumber} /> : null}
      {applyValues.step === 1 ? <EmailVerification onNext={handleNameAndEmail} /> : null}
      {applyValues.step === 2 ? (
        <PasswordVerification onNext={handleRemainData} applyValues={applyValues} />
      ) : null}
      {applyValues.step === 4 ? <SignupDone /> : null}
    </MainContainer>
  );
};

export default SignUpPage;
