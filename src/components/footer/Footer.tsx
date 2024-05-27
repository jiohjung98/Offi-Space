import deleteFirstWord from '@/utils/deleteFirtstWord';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathName = usePathname();
  const filteredPathName = deleteFirstWord(pathName);

  return (
    <footer>
      <nav className=" fixed bottom-0 w-[393px] h-[77.02px] px-[25px] bg-white border-t border-stone-50 justify-between items-center inline-flex z-[999]">
        <Link href="/">
          <div className="h-[44.84px] flex-col justify-start items-center gap-2.5 inline-flex">
            <div className="w-[22.06px] h-[21.82px] flex-col justify-center items-center">
              {filteredPathName === ' ' ? (
                <img className="w-5 h-5 " src="/CheckedHome.svg" />
              ) : (
                <img className="w-5 h-5 " src="/Home.svg" />
              )}
            </div>
            <div className="text-center text-black text-xs font-normal font-['Pretendard']">
              홈
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="h-[44.84px] flex-col justify-start items-center gap-2.5 inline-flex">
            <div className="w-[22.06px] h-[21.82px] flex-col justify-center items-center">
              {filteredPathName === 'resoulvation' ? (
                <img className="w-5 h-5 " src="/CheckedResoulvation.svg" />
              ) : (
                <img className="w-5 h-5 " src="/Resoulvation.svg" />
              )}
            </div>
            <div className="text-center text-black text-xs font-normal font-['Pretendard']">
              예약/일정
            </div>
          </div>
        </Link>
        <Link href="/map">
          <div className="h-[43.75px] flex-col justify-start items-center gap-2.5 inline-flex">
            <div className="w-[22.06px] h-[21.82px]  flex-col  justify-center items-center">
              {filteredPathName === 'map' ? (
                <img className="w-5 h-5  " src="/CheckedNavigation.svg" />
              ) : (
                <img className="w-5 h-5 " src="/Navigation.svg" />
              )}
            </div>
            <div className="text-center text-black text-xs font-normal font-['Pretendard']">
              내 주변
            </div>
          </div>
        </Link>
        <Link href="/community">
          <div className="h-[44.84px] flex-col justify-start items-center gap-2.5 inline-flex">
            <div className="w-[22.06px] h-[21.82px] flex-col justify-center items-center">
              {filteredPathName === 'community' ? (
                <img className="w-5 h-5 " src="/CheckedCommunity.svg" />
              ) : (
                <img className="w-5 h-5 " src="/Community.svg" />
              )}
            </div>
            <div className="text-center text-black text-xs font-normal font-['Pretendard']">
              커뮤니티
            </div>
          </div>
        </Link>
        <Link href="/mypage">
          <div className="h-[44.84px] flex-col justify-start items-center gap-2.5 inline-flex">
            <div className="w-[22.06px] h-[21.82px] flex-col justify-center items-center">
              {filteredPathName === 'mypage' ? (
                <img className="w-5 h-5 " src="/CheckedProfile.svg" />
              ) : (
                <img className="w-5 h-5 " src="/Profile.svg" />
              )}
            </div>
            <div className="text-center text-black text-xs font-normal font-['Pretendard']">
              마이
            </div>
          </div>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
