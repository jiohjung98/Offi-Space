import { deleteRequest, getRequest, postRequest } from '@/api/request';
import axios from 'axios';
import { CommentType } from '../model/commentType';
import { ICommon } from '@/api/types/common';

interface getAllCommentsType {
  postId: string;
  cursorId?: string;
}

interface deleteCommentType {
  postId: string;
  commentId: string;
}

interface postCommentType {
  postId?: string;
  content: string;
}

export const getAllComments = async ({ postId, cursorId }: getAllCommentsType) => {
  try {
    const response = await getRequest<CommentType>(
      `posts/${postId}/comments${cursorId != null ? `?cursorId=${cursorId}` : ''}`
    );
    const lastComment = response?.data?.content?.[response?.data?.content.length - 1];
    const lastVisible = lastComment ? lastComment.commentId : undefined;
    return {
      content: response?.data?.content,
      lastVisible,
      hasNext: response?.data?.hasNext
    };
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteComment = async ({ postId, commentId }: deleteCommentType) => {
  try {
    const url = `posts/${postId}/comments/${commentId}`;
    const { data } = await deleteRequest<ICommon<null>>(url);
    return data;
  } catch (error: any) {
    return error.response.data;
  }

  const { data } = await axios.delete(
    `http://localhost:3000/api/community/${postId}/comments/${commentId}`
  );
  console.log('삭제완료');

  return data;
};

export const postComment = async ({ postId, content }: postCommentType) => {
  try {
    const response = await postRequest<ICommon<null>, postCommentType>(
      `posts/${postId}/comments`,
      {
        content
      }
    );
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};
