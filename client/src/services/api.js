import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchCustomers = async () => {
  const response = await axios.get(`${BASE_URL}/customers`);
  return response.data;
};

export const fetchCustomerById = async (id) => {
  const response = await axios.get(`${BASE_URL}/customers/${id}`);
  return response.data;
};

export const fetchOrdersByCustomer = async (id) => {
  const response = await axios.get(`${BASE_URL}/customers/${id}/orders`);
  return response.data;
};