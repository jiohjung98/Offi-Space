import React, { Fragment } from 'react';
import PostItem from './PostItem';
import { postData } from '../mock/postData';

const PostsLayout = () => {
  //todo : category 바뀔 때 마다 감지해서 글 가져오기
  return (
    <div className="mx-4 mt-10">
      {postData.map((post, i) => (
        <Fragment key={post.id}>
          <PostItem post={post} />
          {i < postData.length - 1 && <div className="w-full h-[2px] bg-gray-50" />}
        </Fragment>
      ))}
    </div>
  );
};

export default PostsLayout;
