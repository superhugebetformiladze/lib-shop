import { AxiosResponse } from 'axios';
import api from '../config/config';
import { IProduct } from '@models/ProductModel';
import { FetchProductParams } from '@models/FetchProductParamsModel';

export const fetchProducts = async (params?: FetchProductParams): Promise<IProduct[]> => {
  try {
    const response: AxiosResponse<IProduct[]> = await api.get('/products/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
