import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { user } from '../mock/user';

const WriteCommentLayout = () => {
  const [commentValue, setCommentValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [commentValue]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  return (
    <div className="w-[393px] fixed bottom-0 bg-white flex items-center px-4 py-4 left-1/2 transform -translate-x-1/2">
      <div className="flex gap-[13px] flex-1">
        <div>
          <img src={user.userImg} alt="" className="w-[42px] h-[42px] rounded-full" />
        </div>
        <div className="flex-1">
          <textarea
            onFocus={() => console.log('focuse')}
            ref={textareaRef}
            value={commentValue}
            onChange={handleChange}
            placeholder="댓글을 입력해주세요."
            className="w-full bg-gray-100 rounded-[10px] py-2 px-3 resize-none overflow-hidden"
            rows={1}
          />
        </div>
        <button
          disabled={commentValue === ''}
          className={`h-10 px-3 py-2 rounded-md border shrink-0 font-semibold
          ${commentValue === '' ? 'text-gray-600 border-gray-400' : 'text-white bg-space-purple'}
          `}>
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteCommentLayout;
