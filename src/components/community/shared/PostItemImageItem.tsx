import React from 'react';

const PostItemImageItem = ({ image, count }: { image: string; count: number }) => {
  return (
    <div className={`${count > 1 ? 'w-[260px] h-[180px] ' : 'w-[360px] h-[180px] z-1'}`}>
      <img src={image} alt="" className="rounded-sm object-scale-down w-full h-full" />
    </div>
  );
};

export default PostItemImageItem;
