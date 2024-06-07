import { noticeInfo } from '@/api/infitiequery/notice.get.api';
import { useInfiniteQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const useNoticeGet = (sortType: string) => {
  // const router = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  console.log(isPageEnd);
  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage = false,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['notice', sortType],
    queryFn: ({ pageParam }) => {
      return noticeInfo(sortType, pageParam);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.lastVisible : undefined;
    },

    initialPageParam: '0'
  });

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

  return {
    allPosts,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    ref
  };
};

export default useNoticeGet;
