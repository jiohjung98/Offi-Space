import MainContainer from '@/components/shared/MainContainer';
// import JobPosition from '@/components/signup/JobPosition';
import Terms from '@/components/signup/Terms';

const SignUpPage = () => {
  // todo 단계별로 회원가입 이뤄지게
  // const [step, setStep] = useState<number>(0);
  return (
    <MainContainer>
      {/* <PhoneCertification /> */}
      {/* <JobPosition /> */}
      <Terms />
    </MainContainer>
  );
};

export default SignUpPage;
