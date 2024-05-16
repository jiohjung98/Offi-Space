import React from 'react';
import { postData } from '../mock/postData';
import { formatDate, formatTime } from '@/utils/invertFullTime';
import PostItemImageLayout from './PostItemImageLayout';
import { useRouter } from 'next/router';

const PostItem = ({ post }: { post: postData }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/community/${post.id}`)}
      className="my-6 border-b-2 border-neutral-200 cursor-pointer">
      {/* 태그자리 */}
      <div className="px-2 py-1 text-center bg-space-purple-light inline-flex rounded-3xl">
        <span className="text-xs font-medium text-space-purple">{post.tag}</span>
      </div>

      {/* 글쓴 유저 자리 */}
      <div className="mt-5 flex items-center gap-[13px]">
        {/* 유저 사진 */}
        <div className="w-[42px] h-[42px]">
          <img
            src={`${post.profileImage}`}
            alt=""
            className="rounded-[50%] w-full h-full"
          />
        </div>

        {/* 유저 닉네임, 직무 */}
        <div className="flex flex-col">
          {/* 유저 이름 */}
          <div className="text-sm font-semibold">{post.nickname}</div>

          {/* 유저직무 */}
          <div className="text-xs text-gray-400">{post.userCategory}</div>
        </div>
      </div>

      {/* 글 제목 */}
      <div className="mt-5 text-lg font-bold">{post.title}</div>

      {/* 글 본문 */}
      <div className="mt-3">{post.content}</div>

      {/* 글 사진 */}
      <PostItemImageLayout postImage={post.image} />

      {/* 글 부가정보 */}
      <div className="mt-[21px] mb-6 flex justify-between items-center text-gray-400 text-xs">
        {/* 글 쓴 시간 */}
        <div className="flex items-center">
          {/* 일자 */}
          <div className="border-r border-neutral-300 pr-2">
            {formatDate(post.createdAt)}
          </div>
          {/* 시간 */}
          <div className="pl-2">{formatTime(post.createdAt)}</div>
        </div>
        <div className="flex gap-3">
          {/* 하트 */}
          <div className="flex gap-1 items-center">
            <img src="/community/heart.svg" alt="" />
            <span>{post.wishCount}</span>
          </div>
          {/* 댓글 */}
          <div className="flex gap-1 items-center">
            <img src="/community/reply.svg" alt="" />
            <span>{post.commentCount}</span>
          </div>
          {/* 조회수 */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
