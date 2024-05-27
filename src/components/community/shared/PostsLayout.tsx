import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import PostItem from './PostItem';
import { useCategoryStore } from '@/store/category.store';
import { useInfiniteQuery } from 'react-query';
import { useCategoryToEnum } from '../hooks/useCategoryToEnum';
import { postDataType } from '../model/postDataType';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Loader from './Loader';
import { getAllPosts } from '../remote/post';

const PostsLayout = () => {
  const { category } = useCategoryStore() as { category: string };
  const newCategory = useCategoryToEnum(category);

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ['AllPosts', newCategory],
      ({ pageParam }) => getAllPosts({ pageParam, category: newCategory }),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.hasNext ? lastPage.lastVisible : undefined;
        },
        enabled: !!newCategory
      }
    );

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  const allPosts = data?.pages?.map(({ content }) => content).flat();

  return (
    <div className="mx-4 mt-8 mb-16">
      {allPosts?.map((post: postDataType, i: number) => (
        <Fragment key={post?.postId}>
          <PostItem post={post} />
          {i < allPosts?.length - 1 && <div className="w-full h-[2px] bg-gray-50" />}
        </Fragment>
      ))}
      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="w-full touch-none" ref={ref} />
    </div>
  );
};

export default PostsLayout;
