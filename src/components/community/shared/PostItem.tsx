import React from 'react';
import { formatDate, formatTime } from '@/utils/invertFullTime';
import PostItemImageLayout from './PostItemImageLayout';
import { useRouter } from 'next/router';
import { sliceText } from '@/utils/sliceTexts';
import { postDataType } from '../model/postDataType';
import { useEnumToCategory } from '../hooks/useEnumToCategory';
import { useEnumToTag } from '../hooks/useEnumToTag';

const PostItem = ({ post }: { post: postDataType }) => {
  const router = useRouter();
  const tag = useEnumToTag(post?.tag);
  return (
    <div
      onClick={() => router.push(`/community/${post.postId}`)}
      className="my-6 cursor-pointer">
      {/* 태그자리 */}
      <div className="px-2 py-1 text-center bg-gray-100 inline-flex rounded-3xl">
        <span className="text-xs font-bold text-gray-700">{tag}</span>
      </div>

      {/* 글쓴 유저 자리 */}
      <div className="mt-5 flex items-center gap-[13px]">
        {/* 유저 사진 */}
        <div className="w-[42px] h-[42px]">
          <img
            src={`${post?.writer.profile}`}
            alt=""
            className="rounded-[50%] w-full h-full"
          />
        </div>

        {/* 유저 닉네임, 직무 */}
        <div className="flex flex-col">
          {/* 유저 이름 */}
          <div className="text-sm font-semibold text-gray-700">
            {post?.writer.nickname}
          </div>

          {/* 유저직무 */}
          <div className="text-xs text-gray-500">
            {useEnumToCategory(post?.writer.job)}
          </div>
        </div>
      </div>

      {/* 글 제목 */}
      <div className="mt-5 text-lg font-bold text-gray-800">{post?.title}</div>

      {/* 글 본문 */}
      <div className="mt-3 text-gray-800 text-sm font-normal">
        {sliceText(post?.content, 95)}
      </div>

      {/* 글 사진 */}
      {(post?.images?.length as number) > 0 && (
        <PostItemImageLayout postImage={post.images} />
      )}

      {/* 글 부가정보 */}
      <div className="mt-[21px] mb-6 flex justify-between items-center text-gray-500 text-xs">
        {/* 글 쓴 시간 */}
        <div className="flex items-center">
          {/* 일자 */}
          <div className="border-r border-neutral-300 pr-2">
            {formatDate(post?.createdDate)}
          </div>
          {/* 시간 */}
          <div className="pl-2">{formatTime(post?.createdDate)}</div>
        </div>
        <div className="flex gap-3">
          {/* 하트 */}
          <div className="flex gap-1 items-center">
            <img src="/community/heart.svg" alt="" />
            <span>{post?.likeCount}</span>
          </div>
          {/* 댓글 */}
          <div className="flex gap-1 items-center">
            <img src="/community/reply.svg" alt="" />
            <span>{post?.commentCount}</span>
          </div>
          {/* 조회수 */}
          <div className="flex gap-1 items-center">
            <img src="/community/viewCount.svg" alt="" />
            <span>{post?.viewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
