// auth.js
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const TOKEN_KEY = 'oc5NoAPZL7JjoHWkZVF2xxufqzMtyXcA';
const COOKIE_EXPIRATION_TIME = 1; // W godzinach

// Pobierz dane użytkownika z API w oparciu o token
const fetchUser = async () => {
  const token = getCookie(TOKEN_KEY);
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

// Funkcja do pobierania wartości ciasteczka
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Funkcja do ustawiania ciasteczka
const setCookie = (name, value, hours) => {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export function useAuth() {
  const queryClient = useQueryClient();

  const setToken = (token) => {
    setCookie(TOKEN_KEY, token, COOKIE_EXPIRATION_TIME);
    queryClient.setQueryData('token', token);
  };

  const getToken = () => {
    return getCookie(TOKEN_KEY);
  };

  const removeToken = () => {
    document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    queryClient.setQueryData('token', null);
  };

  const getUser = async () => {
    try {
      const response = await fetchUser();
      return response;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
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
