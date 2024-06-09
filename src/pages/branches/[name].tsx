import MainContainer from '@/components/shared/MainContainer';
import BranchInfo from '@/components/map/BranchInfo';

const BranchDetailsPage = () => {

  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-screen">
        <div className="w-full h-full">
          <BranchInfo/>
        </div>
      </div>
    </MainContainer>
  );
};

export default BranchDetailsPage;