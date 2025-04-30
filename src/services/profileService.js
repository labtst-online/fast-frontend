import apiClient from './api';

const getMyProfile = async () => {
  const response = await apiClient.get('/profile/profiles/me');
  return response.data;
};

const updateMyProfile = async (formData) => {
  const response = await apiClient.put('/profile/profiles/me', formData);
  return response.data;
};

export { getMyProfile, updateMyProfile };
