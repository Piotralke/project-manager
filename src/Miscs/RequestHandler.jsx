import axios from 'axios';

const BASE_URL = 'http://localhost:5048'; // Zmień na adres API, z którym chcesz komunikować się

const RequestHandler = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },

  post: async (endpoint, data = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  },

  // Dodaj inne metody, takie jak put, delete, itp., w razie potrzeby

};

const handleRequestError = (error) => {
  // Tutaj możesz obsłużyć błędy zapytań, np. wyświetlić komunikat dla użytkownika lub zalogować błąd
  console.error('Request failed:', error.message);
};

export default RequestHandler;
