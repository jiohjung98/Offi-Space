import Link from 'next/link';

interface BackArrowProps {
  width: string;
  height: string;
  name?: string;
}
export const BackArrow = ({ width, height, name }: BackArrowProps) => {
  return (
    <div className="h-[48px] flex flex-row justify-start items-center">
      <Link href="/mypage">
        <img
          src="/mypage/passwordchange/BackArrow.svg"
          alt="Back"
          className="mb-10 cursor-pointer mt-[50px]"
          width={width}
          height={height}
        />
      </Link>
      <div className=" mt-2  ml-3 text-center text-black text-lg font-bold font-['Pretendard'] ">
        {name}
      </div>
    </div>
  );
};
