import MainContainer from '@/components/shared/MainContainer';
import UseMap from '@/components/map/UseMap';
import Footer from '@/components/layout/footer/Footer';

const MapPage = () => {
  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-screen">
        <div className="w-full h-full">
          <UseMap />
          <Footer />
        </div>
      </div>
    </MainContainer>
  );
};

export default MapPage;
