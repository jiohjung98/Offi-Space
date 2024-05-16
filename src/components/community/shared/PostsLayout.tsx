import React from 'react';
import PostItem from './PostItem';
import { postData } from '../mock/postData';

const PostsLayout = () => {
  return (
    <div className="mx-4 mt-10">
      {postData.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsLayout;
