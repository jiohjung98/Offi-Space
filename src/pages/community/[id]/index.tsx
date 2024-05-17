import PostDetailIndex from '@/components/community/PostDetailIndex';
import MainContainer from '@/components/shared/MainContainer';
import { useRouter } from 'next/router';
import React from 'react';

const CommunityDetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  //todo : 여기서 id 가져와서 글 상세정보 뿌려주기
  console.log(id);
  return (
    <MainContainer>
      <PostDetailIndex />
    </MainContainer>
  );
};

export default CommunityDetailPage;
