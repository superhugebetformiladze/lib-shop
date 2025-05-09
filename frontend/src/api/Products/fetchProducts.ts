import { AxiosResponse } from 'axios';
import api from '../config/config';
import { IProduct } from '@models/ProductModel';
import { FetchProductParams } from '@models/FetchProductParamsModel';

export interface ProductListResponse {
  results: IProduct[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const fetchProducts = async (params?: FetchProductParams): Promise<ProductListResponse> => {
  try {
    const response: AxiosResponse<ProductListResponse> = await api.get('/products/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
