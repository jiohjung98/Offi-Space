import { deleteRequest, getRequest, postRequest } from '@/api/request';
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
    let url = `posts/${postId}/comments`;
    const params = [];

    if (cursorId != null) {
      params.push(`cursorId=${cursorId}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    const response = await getRequest<CommentType>(url);
    const lastVisible =
      response?.data?.content?.[response?.data?.content.length - 1]?.commentId;

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
