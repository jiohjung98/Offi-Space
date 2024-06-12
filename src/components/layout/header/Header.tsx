import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  return (
    <header className="border-b border-stone-50  bg-white fixed top-0 w-[393px] h-20 px-4 py-6 flex justify-between items-center z-[9999]">
      <div onClick={() => router.push('/')} className="w-[116px] cursor-pointer">
        <img src="/officelogo.svg" alt="" />
      </div>
      <div className="flex items-center justify-center gap-6">
        <div onClick={() => router.push('mypage/question')} className="cursor-pointer">
          <img src="/Inquiry.svg" alt="" />
        </div>
        <Link href={'/notification'}>
          <div className="cursor-pointer">
            <img src="/Notification.svg" alt="" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
