import { useRouter } from 'next/router';
import MainContainer from '@/components/shared/MainContainer';
import BranchInfo from '@/components/map/BranchInfo';

const BranchDetailsPage = () => {
  const router = useRouter();
  const { name, address } = router.query;

  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-screen">
        <div className="w-full h-full">
          <BranchInfo branchName={name as string} branchAddress={address as string}/>
        </div>
      </div>
    </MainContainer>
  );
};

export default BranchDetailsPage;
