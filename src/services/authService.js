import apiClient from './api';

const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await apiClient.post('/auth/auth/jwt/login', formData, {
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
     },
  });
  if (response.data.access_token) {
    localStorage.setItem('accessToken', response.data.access_token);
    return response.data;
  } else {
    throw new Error("Login successful but no access token received.");
  }
};

const signup = async (email, password) => {
  const response = await apiClient.post('/auth/auth/register', {
    email,
    password,
  });
  return response.data;
};

const logout = async () => {
   try {
     await apiClient.post('/auth/auth/jwt/logout');
     console.log("Server-side logout successful.");
   } catch (error) {
     console.warn("Server-side logout failed (might be okay if token is just removed client-side):", error.response?.data || error.message);
   } finally {
      localStorage.removeItem('accessToken');
      console.log("Access token removed from local storage.");
   }
};

export { login, signup, logout };
