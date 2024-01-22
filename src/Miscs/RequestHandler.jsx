import axios from 'axios';

const BASE_URL = 'http://localhost:5048';

const RequestHandler = {
  get: async (endpoint, token,params = {},headers="") => {
    try {
      const header = headers
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          headers
        },
      });

      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },
  getResponse: async (endpoint, token,params = {},headers="") => {
    try {
      const header = headers
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        responseType: 'blob',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          headers
        },
      });

      return response
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },
  post: async (endpoint, token, data = {},headers="") => {
    try {
      const header = headers
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          header
        },
      });

      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },
  put: async (endpoint, data, token,headers="") => {

    try {
      const header = headers
      const response = await axios.put(`${BASE_URL}${endpoint}`, data, {
        headers:  {
          Authorization: `Bearer ${token}`,
          header
        },
      });

      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },
  
};

const handleRequestError = (error) => {
  console.error('Request failed:', error.message);
};

export default RequestHandler;
