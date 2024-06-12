/* eslint-disable react/jsx-pascal-case */
import MainContainer from '@/components/shared/MainContainer';
import UseMap from '@/components/map/UseMap';
import Footer from '@/components/layout/footer/Footer';
import SEO from '@/components/shared/SEO';

const MapPage = () => {
  return (
    <>
      <SEO title="Offispace | 내 주변" />
      <MainContainer>
        <div className="flex flex-col justify-center items-center gap-[39px] h-screen">
          <div className="w-full h-full">
            <UseMap />
            <Footer />
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default MapPage;
