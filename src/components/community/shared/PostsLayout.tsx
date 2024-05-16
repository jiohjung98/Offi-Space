import React from 'react';
import PostItem from './PostItem';
import { postData } from '../mock/postData';

const PostsLayout = () => {
  return (
    <div className="mx-4">
      {postData.map((post) => (
        <PostItem post={post} />
      ))}
    </div>
  );
};

export default PostsLayout;
