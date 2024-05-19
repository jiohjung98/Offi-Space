import React, { useState } from 'react';
import ToBackComunity from './shared/ToBackComunity';
import WritePostPosition from './career/WritePostPosition';
import { writePostType } from './mock/writePostType';
import WritePostTitle from './shared/WritePostTitle';
import { tagWithCareer } from '@/constant/TagWithCareer';
import WritePostCareerTag from './career/WritePostCareerTag';
import WritePostContent from './shared/WritePostContent';

const WriteCareerPost = () => {
  // 직무 선택, 제목, 내용, 사진 태그
  const [postData, setPostData] = useState<Partial<writePostType>>({
    category: '디자인',
    title: null,
    tag: tagWithCareer[0].title
  });

  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <header className="flex justify-between items-center">
        <ToBackComunity />
        <div className="text-lg font-bold leading-snug cursor-pointer">등록</div>
      </header>
      <nav>
        <WritePostPosition postData={postData} setPostData={setPostData} />
      </nav>
      <div>
        <WritePostTitle postData={postData} setPostData={setPostData} />
      </div>
      <div>
        <WritePostContent setPostData={setPostData} />
      </div>
      <footer>
        <WritePostCareerTag postData={postData} setPostData={setPostData} />
      </footer>
    </div>
  );
};

export default WriteCareerPost;
