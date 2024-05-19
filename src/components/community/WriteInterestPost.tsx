import React, { useState } from 'react';
import { writePostType } from './mock/writePostType';
import { tagWithInterest } from '@/constant/TagWithInterest';
import ToBackComunity from './shared/ToBackComunity';
import WritePostTitle from './shared/WritePostTitle';
import WritePostInterest from './interest/WritePostInterest';
import WritePostInterestTag from './interest/WritePostInterestTag';
import WritePostContent from './shared/WritePostContent';

const WriteInterestPost = () => {
  const [postData, setPostData] = useState<Partial<writePostType>>({
    category: '자유게시판',
    title: null,
    tag: tagWithInterest[0].title
  });

  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <header className="flex justify-between items-center">
        <ToBackComunity />
        <div className="text-lg font-bold leading-snug cursor-pointer">등록</div>
      </header>
      <nav>
        <WritePostInterest postData={postData} setPostData={setPostData} />
      </nav>
      <div>
        <WritePostTitle postData={postData} setPostData={setPostData} />
      </div>
      <div>
        <WritePostContent setPostData={setPostData} />
      </div>
      <footer>
        <WritePostInterestTag postData={postData} setPostData={setPostData} />
      </footer>
    </div>
  );
};

export default WriteInterestPost;
