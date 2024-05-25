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
  try {
    const { data } = await axios.get(`http://localhost:3000/api/community/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deletePost = async (id: string) => {
  const { data } = await axios.delete(`http://localhost:3000/api/community/${id}`);
  return data;
};

export const writePost = async (writePostData: WritePostType) => {
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 FormData에 추가
  const savePostRequest = {
    category: writePostData.category,
    tag: writePostData.tag,
    title: writePostData.title,
    content: writePostData.content
  };
  const jsonBlob = new Blob([JSON.stringify(savePostRequest)], {
    type: 'application/json'
  });
  formData.append('savePostRequest', jsonBlob);

  // 이미지 파일이 있는 경우 FormData에 추가
  if (writePostData.image) {
    writePostData.image.forEach((image: File) => {
      formData.append('images', image);
    });
  }
  const { data } = await axios.post(`http://localhost:3000/api/community`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const registerLike = async (postId: string) => {
  const body = {
    postId: postId
  };
  const { data } = await axios.post(`http://localhost:3000/api/community/like`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
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
