import React from 'react';
import ToBackComunity from './shared/ToBackComunity';
import PostDetail from './shared/PostDetail';
import CommentsLayout from './comments/CommentsLayout';
import { Comment } from './mock/comments';
import WriteCommentLayout from './comments/WriteCommentLayout';
import { useModalStore } from '@/store/modal.store';
import dynamic from 'next/dynamic';
import { PostDetailDataType } from './model/postDetailType';

const DeleteModal = dynamic(() => import('./shared/modal/DeleteModal'), { ssr: false });

interface PostDetailIndexProps {
  postData: PostDetailDataType;
  commentsData: Comment[];
}

const PostDetailIndex = ({ postData, commentsData }: PostDetailIndexProps) => {
  const { open } = useModalStore();

  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <ToBackComunity />
      <PostDetail postData={postData} />
      {/* 구분선 */}
      <div className="w-full h-1 bg-gray-100" />
      {/* 댓글자리 */}
      <CommentsLayout commentsData={commentsData} />
      {/* 댓글입력자리 */}
      <WriteCommentLayout />
      {open ? <DeleteModal /> : ''}
    </div>
  );
};

export default PostDetailIndex;
