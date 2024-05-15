import React from 'react';
import PopularPostsItem from './PopularPostsItem';

const PopularPosts = () => {
  return (
    <section className="w-[361px] mx-[16px] mt-[24px]">
      <header>
        <span className="text-neutral-800 text-lg font-bold font-pretendard">
          이번 주{' '}
        </span>
        <span className="text-indigo-700 text-lg font-bold font-pretendard">
          인기글 BEST
        </span>
      </header>
      <article>
        <PopularPostsItem />
        <PopularPostsItem />
        <PopularPostsItem />
      </article>
    </section>
  );
};

export default PopularPosts;
