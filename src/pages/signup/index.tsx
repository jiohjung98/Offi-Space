// import PhoneCertification from '@/components/signup/PhoneCertification';
import MainContainer from '@/components/shared/MainContainer';
import EamilVerification from '@/components/signup/EamilVertification';
// import JobPosition from '@/components/signup/JobPosition';

const SignUpPage = () => {
  // todo 단계별로 회원가입 이뤄지게
  // const [step, setStep] = useState<number>(0);
  return (
    <MainContainer>
      {/* <PhoneCertification /> */}
      {/* <JobPosition /> */}
      <EamilVerification/>
    </MainContainer>
  );
};

export default SignUpPage;
