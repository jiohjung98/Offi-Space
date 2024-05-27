import MainContainer from '@/components/shared/MainContainer';
import UseMap from '@/components/map/UseMap';

const MapPage = () => {
  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-screen">
        <div className="w-full h-full">
          <UseMap />
        </div>
      </div>
    </MainContainer>
  );
};

export default MapPage;
