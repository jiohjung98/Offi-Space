import axios from 'axios';
import { WritePostType } from '../model/writePostType';
import { getCookie } from '@/utils/cookies';

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
  console.log(writePostData);
  const token = getCookie('token');
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}posts`;

  // JSON 데이터를 문자열로 변환
  const savePostRequest = {
    category: writePostData.category,
    tag: writePostData.tag,
    title: writePostData.title,
    content: writePostData.content
  };

  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(savePostRequest)], {
    type: 'application/json'
  });
  formData.append('savePostRequest', jsonBlob);

  if (writePostData.image && writePostData.image.length > 0) {
    // 이미지 파일 추가
    writePostData.image.forEach((image: File) => {
      formData.append('images', image);
    });
  }
  try {
    const { data } = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`
        // 'Content-Type': 'multipart/form-data'는 자동으로 설정됩니다.
      }
    });
    return data;
  } catch (error) {
    console.error(
      `Error while making post request ${writePostData.image && writePostData.image.length > 0 ? 'with' : 'without'} image`,
      error
    );
    return null;
  }
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
