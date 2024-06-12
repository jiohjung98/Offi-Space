import { useRouter } from 'next/router';

interface BackArrowProps {
  width: string;
  height: string;
  name?: string;
}
export const BackArrow = ({ width, height, name }: BackArrowProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="h-[48px] flex flex-row justify-start items-center">
      <img
        src="/mypage/passwordchange/BackArrow.svg"
        alt="Back"
        className="cursor-pointer"
        width={width}
        height={height}
      />
      <div className="ml-3 text-center text-black text-lg font-bold font-['Pretendard'] ">
        {name}
      </div>
    </div>
  );
};
