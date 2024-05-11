import MainContainer from '@/components/shared/MainContainer';
import EmailVerification from '@/components/signup/EmailVerification';
// import PhoneCertification from '@/components/signup/PhoneCertification';
// import JobPosition from '@/components/signup/JobPosition';

const SignUpPage = () => {
  // todo 단계별로 회원가입 이뤄지게
  // const [step, setStep] = useState<number>(0);
  return (
    <MainContainer>
      <EmailVerification/>
    </MainContainer>
  );
};

export default SignUpPage;
