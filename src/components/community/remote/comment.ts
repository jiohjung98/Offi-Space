import axios from 'axios';

interface getAllCommentsType {
  postId: string;
  cursorId?: string;
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
