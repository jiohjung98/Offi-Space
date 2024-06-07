import React, { useEffect, useState } from 'react';
import WritePostPosition from './career/WritePostPosition';
import WritePostTitle from './shared/WritePostTitle';
import { tagWithCareer } from '@/constant/TagWithCareer';
import WritePostCareerTag from './career/WritePostCareerTag';
import WritePostContent from './shared/WritePostContent';
import { WritePostType } from './model/writePostType';
import { useMutation } from 'react-query';
import { writePost } from './remote/post';
import { useMember } from '@/store/user';
import { useCareerDescription } from './hooks/useCareerDesscription';
import { useRouter } from 'next/router';
import { useCategoryToEnum } from './hooks/useCategoryToEnum';
import { useTagToEnum } from './hooks/useTagToEnum';
import ToBackWithRemoveSession from './shared/ToBackRemoveSession';

const WriteCareerPost = () => {
  const router = useRouter();
  const member = useMember();

  const [postData, setPostData] = useState<WritePostType>({
    category: useCareerDescription(member?.memberJob) as string,
    title: '',
    tag: tagWithCareer[0].title,
    content: ''
  });

  const newPostData = {
    ...postData,
    tag: useTagToEnum(postData.tag) as string,
    category: useCategoryToEnum(postData.category) as string
  };

  const [isValid, setIsValid] = useState(false);

  const { mutateAsync } = useMutation(
    async (postData: WritePostType) => await writePost(postData),
    {
      onSuccess: (data) => {
        if (data == null) {
          alert('오류 발생');
        }
        router.replace(`/community/${data.data.postId}`);
      }
    }
  );

  useEffect(() => {
    const { category, tag, title, content } = postData;
    if (category != '' && tag != '' && title != '' && content != '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [postData, setIsValid]);

  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <header className="flex justify-between items-center">
        <ToBackWithRemoveSession />
        <button
          onClick={() => {
            mutateAsync(newPostData);
          }}
          disabled={!isValid}
          className={`h-10 px-3 py-2 rounded-md shrink-0 font-semibold text-xl
          ${isValid === false ? 'text-gray-600' : 'text-white bg-space-purple'}
          `}>
          등록
        </button>
      </header>
      <nav>
        <WritePostPosition postData={postData} setPostData={setPostData} />
      </nav>
      <div>
        <WritePostTitle postData={postData} setPostData={setPostData} />
      </div>
      <div>
        <WritePostContent postData={postData} setPostData={setPostData} />
      </div>
      <footer>
        <WritePostCareerTag postData={postData} setPostData={setPostData} />
      </footer>
    </div>
  );
};

export default WriteCareerPost;
