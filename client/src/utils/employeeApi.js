import axios from 'axios';

export const fetchEmployees = async () => {
  const response = await axios.get('http://localhost:5000/roles');
  return response.data;
};
