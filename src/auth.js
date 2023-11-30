// auth.js
import { useQueryClient, useQuery } from 'react-query';

const TOKEN_KEY = 'oc5NoAPZL7JjoHWkZVF2xxufqzMtyXcA';

// Pobierz dane użytkownika z API w oparciu o token
const fetchUser = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const response = await fetch('your_user_info_endpoint', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
};

export function useAuth() {
  const queryClient = useQueryClient();

  const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    queryClient.setQueryData('token', token);
  };

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    queryClient.setQueryData('token', null);
  };

  const { data: user } = useQuery('user', fetchUser, {
    enabled: !!getToken(), // Pobierz dane użytkownika tylko, gdy jest dostępny token
  });

  return {
    setToken,
    getToken,
    removeToken,
    user,
  };
}
