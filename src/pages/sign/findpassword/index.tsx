import ChangePasswordDone from '@/components/findpassword/ChangePasswordDone';
import EmailCertification from '@/components/findpassword/EmailCertification';
import SetNewPassword from '@/components/findpassword/SetNewPasswod';
import MainContainer from '@/components/shared/MainContainer';
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
