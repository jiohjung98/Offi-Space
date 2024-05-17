import React from 'react';
import ToBackComunity from './shared/ToBackComunity';
import { postData } from './mock/postData';
import PostDetail from './shared/PostDetail';

const PostDetailIndex = () => {
  const data = postData[0];
  return (
    <div className="mx-4">
      <ToBackComunity />
      <PostDetail data={data} />
    </div>
  );
};

export default PostDetailIndex;
