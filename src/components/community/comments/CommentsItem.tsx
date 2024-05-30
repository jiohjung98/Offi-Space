import React from 'react';
import { formatDate, formatTime } from '@/utils/invertFullTime';
import { useModalStore } from '@/store/modal.store';
import { CommentDataType } from '../model/commentType';
import { useEnumToCategory } from '../hooks/useEnumToCategory';
import Image from 'next/image';

const CommentsItem = ({
  comment,
  postId
}: {
  comment: CommentDataType;
  postId: string;
}) => {
  const { setOpen, setDeleteId, setCategory, setCommentId } = useModalStore();
  return (
    <div className="mt-4 mb-5">
      {/* 사진 닉네임 카테고리 삭제 자리 */}
      {/* 글쓴 유저 자리 */}
      <div className="mt-5 flex  gap-[13px]">
        {/* 유저 사진 */}
        <div className="w-[42px] h-[42px]">
          <Image
            src={`${comment?.writer?.profile}`}
            alt="image"
            width={42}
            height={42}
            quality={75}
            className="rounded-[50%] w-full h-full"
          />
        </div>

        {/* 유저 닉네임, 직무 */}
        <div className="flex flex-col flex-1">
          {/* 유저 이름 */}
          <div className="flex justify-between">
            <div className="text-sm font-semibold">{comment?.writer?.nickname}</div>
            {comment?.isWriter && (
              <div
                onClick={() => {
                  setOpen(true);
                  setDeleteId(postId);
                  setCategory('comment');
                  setCommentId(comment.commentId);
                }}
                className="text-gray-500 text-sm font-normal underline cursor-pointer">
                삭제
              </div>
            )}
          </div>

          {/* 유저직무 */}
          <div className="text-xs text-gray-400">
            {useEnumToCategory(comment?.writer?.job)}
          </div>

          {/* 댓글 내용 */}
          <div className="mt-[15px] text-sm font-normal leading-normal text-gray-800">
            {comment?.content}
          </div>

          {/* 댓글 작성 시간 */}
          <div className="flex items-center mt-3 text-gray-500 text-xs font-normal">
            {/* 일자 */}
            <div className="border-r border-neutral-300 pr-2">
              {formatDate(comment?.createdDate)}
            </div>
            {/* 시간 */}
            <div className="pl-2">{formatTime(comment?.createdDate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsItem;
