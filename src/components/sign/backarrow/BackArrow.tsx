import Link from 'next/link';

interface BackArrowProps {
  width: string;
  height: string;
  name?: string;
  link: string;
}
export const BackArrow = ({ width, height, name, link }: BackArrowProps) => {
  return (
    <div className="h-[48px] flex flex-row justify-start items-center">
      <Link href={`/${link}`}>
        <img
          src="/mypage/passwordchange/BackArrow.svg"
          alt="Back"
          className="cursor-pointer"
          width={width}
          height={height}
        />
      </Link>
      <div className="ml-3 text-center text-black text-lg font-bold font-['Pretendard'] ">
        {name}
      </div>
    </div>
  );
};
