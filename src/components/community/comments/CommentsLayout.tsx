import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import CommentsItem from './CommentsItem';
import { CommentType } from '../model/commentType';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { getAllComments } from '../remote/comment';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Loader from '../shared/Loader';

const CommentsLayout = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['AllComments', id],
    ({ pageParam }) => getAllComments({ postId: id, cursorId: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext ? lastPage.lastVisible : undefined;
      },
      enabled: id != null
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
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (commentsData == null) {
    return null;
  }

  const allComments = commentsData?.pages
    ?.map(({ content }) => content)
    .flat() as CommentType[];

  return (
    <div className="mb-[80px]">
      <div className="mt-5">댓글 수 {allComments?.length}</div>
      {/* todo 댓글 없을때 아직 댓글이 없어요 표시 */}
      {allComments?.map((comment: CommentType, i) => (
        <Fragment key={i}>
          <CommentsItem comment={comment} postId={id} />
          {i < allComments.length - 1 && (
            <div className="w-full h-[2px] bg-gray-100 mr-12" />
          )}
        </Fragment>
      ))}
      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="w-full touch-none" ref={ref} />
    </div>
  );
};

export default CommentsLayout;
