import axios from 'axios';

interface getAllPostsType {
  pageParam: string;
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
