import { useModalStore } from '@/store/modal.store';
import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../../remote/post';
import { useRouter } from 'next/router';
import { deleteComment } from '../../remote/comment';

const DeleteModal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { deleteId, category, commentId, setOpen } = useModalStore();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  const { mutateAsync } = useMutation(
    async (deleteId: string) => {
      if (category == 'post') {
        await deletePost(deleteId);
      }
      if (category == 'comment') {
        await deleteComment({
          postId: deleteId,
          commentId: commentId as string
        });
      }
    },
    {
      onSuccess: () => {
        setOpen(false);
        if (category === 'post') {
          router.replace('/community');
        } else if (category === 'comment') {
          queryClient.invalidateQueries(['AllComments', deleteId]);
        }
      }
    }
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-30">
      <div
        ref={ref}
        className="z-50 w-[281px] bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl">
        <div className="leading-normal text-gray-900">
          <div>
            <div className="font-bold text-lg mt-10 flex justify-center">
              {category === 'post' ? '글을 삭제하시겠어요?' : ' 댓글을 삭제하시겠어요?'}
            </div>
            <div className="text-[14px] font-normal mt-1 flex justify-center">
              삭제 후에는 복구 할 수 없습니다.
            </div>
          </div>

          <div className="mt-7 flex border-t border-gray-300 font-semibold">
            <div
              onClick={() => {
                if (deleteId) {
                  mutateAsync(deleteId);
                }
              }}
              className="cursor-pointer text-space-purple flex-1 flex justify-center items-center px-[53px] py-[10px] border-r border-gray-300">
              삭제
            </div>
            <div
              onClick={() => setOpen(false)}
              className="cursor-pointer flex-1 flex justify-center items-center px-[53px] py-[10px]">
              취소
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
