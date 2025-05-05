import axios, { AxiosResponse } from 'axios';
import baseURL from '../config/config';
import { IProduct } from '@models/ProductModel';



const api = axios.create({
  baseURL: baseURL,
});

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response: AxiosResponse<IProduct[]> = await api.get('/products/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
