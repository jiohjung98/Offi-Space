import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postComment } from '../remote/comment';
import { useMember } from '@/store/user';
import Image from 'next/image';

const WriteCommentLayout = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { imageUrl } = useMember() as { imageUrl: string };
  const [commentValue, setCommentValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutateAsync } = useMutation(
    async ({ postId, content }: { postId: string; content: string }) =>
      await postComment({
        postId: postId,
        content: content
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        setCommentValue('');
        queryClient.invalidateQueries(['AllComments', String(postId)]);
      }
    }
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [commentValue]);

  return (
    <div className="w-[393px] fixed bottom-0 bg-white flex items-center px-4 py-4 left-1/2 transform -translate-x-1/2">
      <div className="flex gap-[13px] flex-1">
        <div>
          <Image
            src={imageUrl}
            alt="image"
            className="w-[42px] h-[42px] rounded-full"
            width={42}
            height={42}
            quality={75}
          />
        </div>
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className="w-full bg-gray-100 rounded-[10px] py-2 px-3 resize-none overflow-hidden"
            rows={1}
          />
        </div>
        <button
          onClick={() =>
            mutateAsync({
              postId: postId,
              content: commentValue
            })
          }
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
