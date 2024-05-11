import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

const ToBack = () => {
  return (
    <div className="w-[80px] mt-[60px]">
      <Link href={'/sign'}>
        <IoIosArrowRoundBack size={80} />
      </Link>
    </div>
  );
};

export default ToBack;
