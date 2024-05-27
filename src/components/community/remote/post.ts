import axios from 'axios';
import { WritePostType } from '../model/writePostType';
import { getCookie } from '@/utils/cookies';
import { deleteRequest, getRequest, postRequest } from '@/api/request';
import { PostDetailType } from '../model/postDetailType';
import { ICommon } from '@/api/types/common';

interface getAllPostsType {
  pageParam?: string;
  category: string;
}

interface registerLikeType {
  postId: string | number;
}

//게시글 전체 조회
export const getAllPosts = async ({ pageParam, category }: getAllPostsType) => {
  try {
    let url = 'posts';
    const params = [];

    if (category && category !== 'ALL') {
      params.push(`category=${category}`);
    } else if (category === 'ALL') {
      params.push(`category=INTEREST`);
    }

    if (pageParam != null) {
      params.push(`cursorId=${pageParam}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    const response = await getRequest<PostDetailType>(url);
    const lastVisible =
      response?.data?.content[response?.data?.content.length - 1].postId;

    return {
      content: response?.data?.content,
      lastVisible,
      hasNext: response?.data?.hasNext
    };
  } catch (error: any) {
    return error.response.data;
  }
};

//게시글 상세조회
export const getPostDetail = async (id: string) => {
  try {
    const { data } = await getRequest<PostDetailType>(`posts/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

//게시글 삭제
export const deletePost = async (id: string) => {
  try {
    const url = `posts/${id}`;
    const { data } = await deleteRequest<ICommon<null>>(url);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

//게시글 등록
export const writePost = async (writePostData: WritePostType) => {
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

//게시글 좋아요
export const registerLike = async ({ postId }: registerLikeType) => {
  try {
    const res = postRequest<ICommon<null>, registerLikeType>('posts/like', {
      postId
    });
    return res;
  } catch (error: any) {
    return error.response.data;
  }
};

//좋아요 취소
export const cancelLike = async (postId: string) => {
  try {
    const res = deleteRequest<ICommon<null>>(`posts/${postId}/like`);
    return res;
  } catch (error: any) {
    return error.response.data;
  }
};
