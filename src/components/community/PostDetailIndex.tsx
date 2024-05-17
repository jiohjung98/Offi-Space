import React from 'react';
import ToBackComunity from './shared/ToBackComunity';
import { postData } from './mock/postData';
import PostDetail from './shared/PostDetail';
import CommentsLayout from './comments/CommentsLayout';
import { Comment } from './mock/comments';

interface PostDetailIndexProps {
  data: postData;
  commentsData: Comment[];
}

const PostDetailIndex = ({ data, commentsData }: PostDetailIndexProps) => {
  return (
    <div className="mx-4">
      <ToBackComunity />
      <PostDetail data={data} />
      {/* 구분선 */}
      <div className="w-full h-[8.21px] bg-gray-100" />
      {/* 댓글자리 */}
      <CommentsLayout commentsData={commentsData} />
    </div>
  );
};

export default PostDetailIndex;
