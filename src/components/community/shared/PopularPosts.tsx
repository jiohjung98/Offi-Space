import React from 'react';
import PopularPostsItem from './PopularPostsItem';
import { usePopularPostsStore } from '@/store/popularPosts.store';
import { popularMockData } from '../mock/data';

const PopularPosts = () => {
  const { category } = usePopularPostsStore();
  console.log(category);
  return (
    <section className="w-[361px] mx-[16px] mt-[24px] mb-[20px]">
      <header>
        <span className="text-neutral-800 text-lg font-bold font-pretendard">
          이번 주{' '}
        </span>
        <span className="text-indigo-700 text-lg font-bold font-pretendard">
          인기글 BEST
        </span>
      </header>
      <article>
        {popularMockData.map((post, i) => (
          <PopularPostsItem key={i} contents={post.contents} tag={post.tag} index={i} />
        ))}
      </article>
    </section>
  );
};

export default PopularPosts;
