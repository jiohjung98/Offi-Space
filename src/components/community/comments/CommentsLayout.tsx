'use client';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import CommentsItem from './CommentsItem';
import { CommentDataType } from '../model/commentType';
import { useInfiniteQuery } from 'react-query';
import { getAllComments } from '../remote/comment';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Loader from '../shared/Loader';

const CommentsLayout = ({ postId }: { postId: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = pageRef?.isIntersecting ?? false;

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['AllComments', postId],
    ({ pageParam }) => getAllComments({ postId: postId, cursorId: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext ? lastPage.lastVisible : undefined;
      },
      enabled: !!postId
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
    .flat() as CommentDataType[];

  return (
    <div className="mb-[80px]">
      <div className="mt-5">댓글 수 {allComments?.length}</div>
      {allComments?.length > 0 ? (
        allComments?.map((comment: CommentDataType, i) => (
          <Fragment key={i}>
            <CommentsItem comment={comment} postId={comment.commentId} />
            {i < allComments.length - 1 && (
              <div className="w-full h-[2px] bg-gray-100 mr-12" />
            )}
          </Fragment>
        ))
      ) : (
        <div className="py-[45px] flex items-center justify-center text-gray-800">
          아직 댓글이 없어요.
        </div>
      )}
      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="w-full touch-none" ref={ref} />
    </div>
  );
};

export default CommentsLayout;
