import axios from 'axios';
import { WritePostType } from '../model/writePostType';

interface getAllPostsType {
  pageParam?: string;
  category: string;
}

export const getAllPosts = async ({ pageParam, category }: getAllPostsType) => {
  let url = 'http://localhost:3000/api/community';

  if (category && category !== 'all') {
    url += `?category=${category}`;
  }
  if (pageParam != null) {
    const cursorId = pageParam;
    url += `&cursorId=${cursorId}`;
  }

  const { data } = await axios.get(url);
  const lastVisible = data.data.content[data.data.content.length - 1].postId;

  return {
    content: data.data.content,
    lastVisible,
    hasNext: data.data.hasNext
  };
};

export const getPostDetail = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/community/${id}`);

  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await axios.delete(`http://localhost:3000/api/community/${id}`);

  //todo 삭제 오류 에러헨들링

  return data;
};

export const writePost = async (writePostData: WritePostType) => {
  const { data } = await axios.post(`http://localhost:3000/api/community`, writePostData);
  const dataString = JSON.stringify(data);
  //todo 에러핸들링 필요
  return dataString;
};

export const registerLike = async (postId: string) => {
  const body = {
    postId: postId
  };
  const { data } = await axios.post(`http://localhost:3000/api/community/like`, body);
  const dataString = JSON.stringify(data);
  //todo 에러핸들링 필요
  return dataString;
};

export const cancelLike = async (postId: string) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/community/${postId}/like`
  );
  const dataString = JSON.stringify(data);
  //todo 에러핸들링 필요
  return dataString;
};
