// auth.js
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setToken as setTokenAction, setUser as setUserAction, removeToken as removeTokenAction } from './Reducers/authReducer';
const TOKEN_KEY = 'oc5NoAPZL7JjoHWkZVF2xxufqzMtyXcA';
const COOKIE_EXPIRATION_TIME = 2; // W godzinach

// Pobierz dane użytkownika z API w oparciu o token
const fetchUser = async (dispatch) => {
  const token = getCookie(TOKEN_KEY);
  if (!token) return null;

  try {
    const response = await axios.get('http://localhost:5048/api/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUserAction(response.data));
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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const getToken = () => {
    const token = getCookie(TOKEN_KEY)
    if (!token) return null;
    return token
  }
  const setToken = async (token) => {
    setCookie(TOKEN_KEY, token, COOKIE_EXPIRATION_TIME);
    dispatch(setTokenAction(token));
  };

  const removeToken = () => {
    document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    dispatch(removeTokenAction());
  };

  const isAuthenticated = async () => {
    const token = getToken()
    if (!token) {
      return false;
    }

    try {
      await fetchUser(dispatch);
      return true; // Jeśli autoryzacja się powiedzie, użytkownik jest zalogowany
    } catch (error) {
      return false;
    }
  };

  const getUser = async () => {
    try {
      const response = await fetchUser(dispatch);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  };

  return {
    setToken,
    removeToken,
    getUser,
    getToken,
    isAuthenticated,
  };
}