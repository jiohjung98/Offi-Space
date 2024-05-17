import React from 'react';
import { postData } from '../mock/postData';

const PostDetail = ({ data }: { data: postData }) => {
  return (
    <div className="mt-5">
      {/* 태그자리 */}
      <div className="px-2 py-1 text-center bg-gray-100 inline-flex rounded-3xl">
        <span className="text-xs font-medium text-gray-700">{data.tag}</span>
      </div>

      {/* 사진 닉네임 카테고리 삭제 자리 */}
      {/* 글쓴 유저 자리 */}
      <div className="mt-5 flex items-center gap-[13px]">
        {/* 유저 사진 */}
        <div className="w-[42px] h-[42px]">
          <img
            src={`${data.profileImage}`}
            alt=""
            className="rounded-[50%] w-full h-full"
          />
        </div>

        {/* 유저 닉네임, 직무 */}
        <div className="flex flex-col flex-1">
          {/* 유저 이름 */}
          <div className="flex justify-between">
            <div className="text-sm font-semibold">{data.nickname}</div>
            {data.isWriter && (
              <div className="text-gray-500 text-sm font-normal underline cursor-pointer">
                삭제
              </div>
            )}
          </div>

          {/* 유저직무 */}
          <div className="text-xs text-gray-400">{data.userCategory}</div>
        </div>
      </div>

      {/* 제목자리 */}
      <div className="mt-6 text-lg font-bold">{data.title}</div>

      {/* 컨텐츠 내용자리 */}
      <div className="mt-3">{data.content}</div>

      {/* 사진자리 */}
      <div className="w-["></div>

      {/* 시간자리 */}
      <div></div>

      {/* 좋아요 조회수 자리 */}
      <div>
        {/* 좋아요 */}
        <div></div>
        {/* 조회수 */}
        <div></div>
      </div>
    </div>
  );
};

export default PostDetail;
