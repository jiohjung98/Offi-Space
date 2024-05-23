import React, { Dispatch, useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { WritePostType } from '../model/writePostType';

interface WritePostTitleType {
  postData: Partial<WritePostType>;
  setPostData: Dispatch<React.SetStateAction<WritePostType>>;
}

const WritePostTitle = ({ postData, setPostData }: WritePostTitleType) => {
  const [title, setTitle] = useState(postData.title || '');

  //입력될 때 마다 렌더링 되는거 방지
  const debouncedTitle = useDebounce(title, 800);

  useEffect(() => {
    setPostData((prev) => ({
      ...prev,
      title: debouncedTitle
    }));
  }, [debouncedTitle, setPostData]);

  return (
    <div className="flex border-b border-gray-200 items-center py-4 gap-3">
      <div className="text-lg font-bold text-gray-900">제목</div>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        className="flex-1 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default WritePostTitle;
