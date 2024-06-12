/* eslint-disable react/jsx-pascal-case */
import MainContainer from '@/components/shared/MainContainer';
import SEO from '@/components/shared/SEO';
import ChangePasswordDone from '@/components/sign/findpassword/ChangePasswordDone';
import EmailCertification from '@/components/sign/findpassword/EmailCertification';
import SetNewPassword from '@/components/sign/findpassword/SetNewPasswod';
import React, { useState } from 'react';

const FindPasswordPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  return (
    <>
      <SEO title="Offispace | 비밀번호 찾기" />
      <MainContainer>
        {step === 0 ? <EmailCertification setStep={setStep} setEmail={setEmail} /> : null}
        {step === 1 ? <SetNewPassword setStep={setStep} Email={email} /> : null}
        {step === 2 ? <ChangePasswordDone /> : null}
      </MainContainer>
    </>
  );
};

export default FindPasswordPage;
