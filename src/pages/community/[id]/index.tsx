'use client';
import PostDetailIndex from '@/components/community/PostDetailIndex';
import { commentsData } from '@/components/community/mock/comments';
import { getPostDetail } from '@/components/community/remote/post';
import MainContainer from '@/components/shared/MainContainer';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

const CommunityDetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: postData } = useQuery(['post', id], () => getPostDetail(id), {
    enabled: id != null
  });

  if (postData == null) {
    return null;
  }

  return (
    <MainContainer>
      <PostDetailIndex postData={postData?.data[0]} commentsData={commentsData} />
    </MainContainer>
  );
};

export default CommunityDetailPage;
