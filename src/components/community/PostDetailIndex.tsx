import React from 'react';
import ToBackComunity from './shared/ToBackComunity';
import { postData } from './mock/postData';
import PostDetail from './shared/PostDetail';
import CommentsLayout from './comments/CommentsLayout';
import { Comment } from './mock/comments';
import WriteCommentLayout from './comments/WriteCommentLayout';
import { useDeleteModalStore } from '@/store/deleteModal.store';
import dynamic from 'next/dynamic';

const DeleteModal = dynamic(() => import('./shared/modal/DeleteModal'), { ssr: false });

interface PostDetailIndexProps {
  data: postData;
  commentsData: Comment[];
}

const PostDetailIndex = ({ data, commentsData }: PostDetailIndexProps) => {
  const { open } = useDeleteModalStore();
  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <ToBackComunity />
      <PostDetail data={data} />
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
