import React, { useState } from 'react';
import { user } from '../mock/user';

const WriteCommentLayout = () => {
  const [commentValue, setCommentValue] = useState('');
  return (
    <div className=" w-[368px] h-[70px] fixed bottom-0 bg-white flex items-center">
      <div className="my-2 flex items-center gap-[13px] flex-1">
        <div>
          <img src={user.userImg} alt="" className="w-[42px] h-[42px] rounded-full" />
        </div>
        <div className="flex-1">
          <input
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            type="text"
            placeholder="댓글을 입력해주세요."
            className="w-full bg-gray-100 h-10 rounded-[10px] py-2  px-3"
          />
        </div>
        <button className="px-3 py-2 rounded-md border border-gray-400 text-gray-600">
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteCommentLayout;
