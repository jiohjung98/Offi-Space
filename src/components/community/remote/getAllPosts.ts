import axios from 'axios';

export const getAllPosts = async (category: string) => {
  console.log(category);
  const { data } = await axios.get(
    `http://localhost:3000/api/community?category=${category}`
  );
  return data;
};
