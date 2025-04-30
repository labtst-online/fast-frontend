import apiClient from './api';

const getUserPosts = async (userId) => {
  const response = await apiClient.get(`/content/content/users/${userId}/posts`);
  return response.data;
};

const createPost = async (title, content) => {
  const response = await apiClient.post('/content/content/posts', { title, content });
  return response.data;
};

const getPostById = async (postId) => {
    const response = await apiClient.get(`/content/content/posts/${postId}`);
    return response.data;
}

export { getUserPosts, createPost, getPostById };
