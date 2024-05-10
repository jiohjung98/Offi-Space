// import PhoneCertification from '@/components/signup/PhoneCertification';
import MainContainer from '@/components/shared/MainContainer';
import EmaillVerification from '@/components/signup/EmailVerification';
// import JobPosition from '@/components/signup/JobPosition';

const SignUpPage = () => {
  // todo 단계별로 회원가입 이뤄지게
  // const [step, setStep] = useState<number>(0);
  return (
    <MainContainer>
      {/* <PhoneCertification /> */}
      {/* <JobPosition /> */}
      <EmaillVerification/>
    </MainContainer>
  );
};

export default SignUpPage;
