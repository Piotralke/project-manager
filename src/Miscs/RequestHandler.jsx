import axios from 'axios';
import { useAuth } from '../auth';

const BASE_URL = 'http://localhost:5048';

const RequestHandler = {
  get: async (endpoint, token,params = {},) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },

  post: async (endpoint, token, data = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },
  put: async (endpoint, data, token) => {
    try {
      const response = await axios.put(`${BASE_URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },
  // Dodaj inne metody, takie jak put, delete, itp., w razie potrzeby
};

const handleRequestError = (error) => {
  console.error('Request failed:', error.message);
};

export default RequestHandler;
