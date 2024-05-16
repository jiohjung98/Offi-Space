import PostDetailIndex from '@/components/community/PostDetailIndex';
import MainContainer from '@/components/shared/MainContainer';
import { useRouter } from 'next/router';
import React from 'react';

const CommunityDetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  console.log(id);
  return (
    <MainContainer>
      <PostDetailIndex />
    </MainContainer>
  );
};

export default CommunityDetailPage;
