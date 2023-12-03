// auth.js
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
const TOKEN_KEY = 'oc5NoAPZL7JjoHWkZVF2xxufqzMtyXcA';

// Pobierz dane użytkownika z API w oparciu o token
const fetchUser = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const response = await axios.get('http://localhost:5048/api/users/current', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
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
  const getUser = async () => {
    await fetchUser().then( (response)=>{
      console.log(response)
      return response
    }
    );
  };
  // const { data: user } = useQuery('user', fetchUser, {
  //   enabled: !!getToken(), // Pobierz dane użytkownika tylko, gdy jest dostępny token
  // });

  return {
    setToken,
    getToken,
    removeToken,
    getUser,
  };
}
