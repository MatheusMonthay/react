import axios from 'axios';

const API_BASE_URL = 'https://www.abibliadigital.com.br/api';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
