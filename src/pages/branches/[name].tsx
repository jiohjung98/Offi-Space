import { useRouter } from 'next/router';
import MainContainer from '@/components/shared/MainContainer';
import OfficeInfo from '@/components/map/OfficeInfo';

const BranchDetailsPage = () => {
  const router = useRouter();
  const { name, address } = router.query;

  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-screen">
        <div className="w-full h-full">
          <OfficeInfo branchName={name as string} branchAddress={address as string}/>
        </div>
      </div>
    </MainContainer>
  );
};

export default BranchDetailsPage;
