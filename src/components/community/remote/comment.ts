import axios from 'axios';

interface getAllCommentsType {
  postId: string;
  cursorId?: string;
}

interface deleteCommentType {
  postId: string;
  commentId: string;
}

interface postCommentType {
  postId: string;
  content: string;
}

export const getAllComments = async ({ postId, cursorId }: getAllCommentsType) => {
  let url = `http://localhost:3000/api/community/${postId}/comments`;

  if (cursorId != null) {
    url += `?cursorId=${cursorId}`;
  }

  const { data } = await axios.get(url);
  const lastVisible = data.data.content[data.data.content.length - 1].postId;

  return {
    content: data.data.content,
    lastVisible,
    hasNext: data.data.hasNext
  };
};

export const deleteComment = async ({ postId, commentId }: deleteCommentType) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/community/${postId}/comments/${commentId}`
  );
  console.log('삭제완료');

  return data;
};

export const postComment = async ({ postId, content }: postCommentType) => {
  const { data } = await axios.post(
    `http://localhost:3000/api/community/${postId}/comments`,
    { content },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return data;
};
