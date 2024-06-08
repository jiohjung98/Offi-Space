import MainContainer from '@/components/shared/MainContainer';
import ChangePasswordDone from '@/components/sign/findpassword/ChangePasswordDone';
import EmailCertification from '@/components/sign/findpassword/EmailCertification';
import SetNewPassword from '@/components/sign/findpassword/SetNewPasswod';
import React, { useState } from 'react';

const FindPasswordPage = () => {
  const [step, setStep] = useState(0);

  return (
    <MainContainer>
      {step === 0 ? <EmailCertification setStep={setStep} /> : null}
      {step === 1 ? <SetNewPassword setStep={setStep} /> : null}
      {step === 2 ? <ChangePasswordDone /> : null}
    </MainContainer>
  );
};

export default FindPasswordPage;
