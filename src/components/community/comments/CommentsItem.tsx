import React from 'react';
import { Comment } from '../mock/comments';
import { formatDate, formatTime } from '@/utils/invertFullTime';

const CommentsItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="mt-4 mb-5">
      {/* 사진 닉네임 카테고리 삭제 자리 */}
      {/* 글쓴 유저 자리 */}
      <div className="mt-5 flex  gap-[13px]">
        {/* 유저 사진 */}
        <div className="w-[42px] h-[42px]">
          <img
            src={`${comment.profileImage}`}
            alt=""
            className="rounded-[50%] w-full h-full"
          />
        </div>

        {/* 유저 닉네임, 직무 */}
        <div className="flex flex-col flex-1">
          {/* 유저 이름 */}
          <div className="flex justify-between">
            <div className="text-sm font-semibold">{comment.nickname}</div>
            {comment.isWritter && (
              <div className="text-gray-500 text-sm font-normal underline cursor-pointer">
                삭제
              </div>
            )}
          </div>

          {/* 유저직무 */}
          <div className="text-xs text-gray-400">{comment.category}</div>

          {/* 댓글 내용 */}
          <div className="mt-[15px] text-sm font-normal leading-normal text-gray-800">
            {comment.content}
          </div>

          {/* 댓글 작성 시간 */}
          <div className="flex items-center mt-3 text-gray-500 text-xs font-normal">
            {/* 일자 */}
            <div className="border-r border-neutral-300 pr-2">
              {formatDate(comment.createdAt)}
            </div>
            {/* 시간 */}
            <div className="pl-2">{formatTime(comment.createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsItem;
