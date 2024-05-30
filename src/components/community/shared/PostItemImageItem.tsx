import Image from 'next/image';
import React from 'react';

const PostItemImageItem = ({ image, count }: { image: string; count: number }) => {
  return (
    <div
      className={`${count > 1 ? 'w-[260px] h-[180px] relative' : 'w-[360px] h-[180px] z-1 relative'}`}>
      <Image
        src={image}
        // width={`${count > 1 ? 260 : 360}`}
        // height={180}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 360px"
        fill
        className="rounded-sm object-cover w-full h-full"
        alt="image"
        priority
        quality={75}
      />
    </div>
  );
};

export default PostItemImageItem;
