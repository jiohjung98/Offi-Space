/* eslint-disable @typescript-eslint/no-explicit-any */
import { signup } from '@/api/auth/auth.post.api';
import { ISignUp } from '@/api/types/auth';
import MainContainer from '@/components/shared/MainContainer';
import EmailVerification from '@/components/signup/EmailVerification';
import PasswordVerification from '@/components/signup/PasswordVerification';
import PhoneCertification from '@/components/signup/PhoneCertification';
import { ApplyValues } from '@/models/applyValues';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

const SignUpPage = () => {
  const router = useRouter();
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    step: 2
  });
  const [error, setError] = useState(false);

  const { mutateAsync: signUpReq } = useMutation(
    ({
      memberEmail,
      memberPassword,
      memberName,
      memberJob,
      memberPhone,
      memberSmsAgree
    }: ISignUp) => {
      return signup({
        memberEmail,
        memberPassword,
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
        })),
      onError: (error: any) => {
        if (error.response.data) {
          setError(true);
        }
      }
    }
  );

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

  useEffect(() => {
    if (applyValues.step === 3) {
      signUpReq({
        memberEmail: applyValues.memberEmail as string,
        memberPassword: applyValues.memberPassword as string,
        memberName: applyValues.memberName as string,
        memberJob: applyValues.memberJob as string,
        memberPhone: applyValues.memberPhone as string,
        memberSmsAgree: applyValues.memberSmsAgree as boolean
      });
    }
  }, [applyValues, signUpReq]);

  if (error) {
    router.replace('signup/error');
  }

  return (
    <MainContainer>
      {applyValues.step === 0 ? <PhoneCertification onNext={handlePhoneNumber} /> : null}
      {applyValues.step === 1 ? <EmailVerification onNext={handleNameAndEmail} /> : null}
      {applyValues.step === 2 ? (
        <PasswordVerification onNext={handleRemainData} applyValues={applyValues} />
      ) : null}
      {/* todo 회원가입 완료 되면,mutateAsync onSucess로 applyValues step 3으로 만들고 done
      페이지 보이기 */}
    </MainContainer>
  );
};

export default SignUpPage;
