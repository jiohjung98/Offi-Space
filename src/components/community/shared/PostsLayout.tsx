import React, { Fragment } from 'react';
import PostItem from './PostItem';
import { useCategoryStore } from '@/store/category.store';
import { useQuery } from 'react-query';
import { getAllPosts } from '../remote/getAllPosts';
import { useCategoryToEnum } from '../hooks/useCategoryToEnum';
import { postDataType } from '../model/postDataType';

const PostsLayout = () => {
  //todo : category 바뀔 때 마다 감지해서 글 가져오기
  const { category } = useCategoryStore() as { category: string };
  const newCategory = useCategoryToEnum(category);
  const { data: allPostData } = useQuery(['getAllPosts', newCategory], () =>
    getAllPosts(newCategory)
  );

  return (
    <div className="mx-4 mt-10">
      {allPostData?.data?.content.map((post: postDataType, i: number) => (
        <Fragment key={post.postId}>
          <PostItem post={post} />
          {i < allPostData?.data?.content.length - 1 && (
            <div className="w-full h-[2px] bg-gray-50" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default PostsLayout;
