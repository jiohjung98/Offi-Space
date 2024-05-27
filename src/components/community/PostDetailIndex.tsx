import React from 'react';
import ToBackComunity from './shared/ToBackComunity';
import PostDetail from './shared/PostDetail';
import CommentsLayout from './comments/CommentsLayout';
import WriteCommentLayout from './comments/WriteCommentLayout';
import { useModalStore } from '@/store/modal.store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getPostDetail } from './remote/post';
import ConfirmModal from './shared/modal/ConfirmModal';

const DeleteModal = dynamic(() => import('./shared/modal/DeleteModal'), { ssr: false });

const PostDetailIndex = () => {
  const { open } = useModalStore();
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: postData } = useQuery(['post', id], () => getPostDetail(id), {
    enabled: id != null
  });

  if (postData?.status == 'FAIL') {
    return <ConfirmModal />;
  }

  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <ToBackComunity />
      <PostDetail postData={postData && postData} />
      {/* 구분선 */}
      <div className="w-full h-1 bg-gray-100" />
      {/* 댓글자리 */}
      <CommentsLayout />
      {/* 댓글입력자리 */}
      <WriteCommentLayout postId={id} />
      {open ? <DeleteModal /> : ''}
    </div>
  );
};

export default PostDetailIndex;
