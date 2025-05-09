import { AxiosResponse } from 'axios';
import api from '../config/config';
import { IProduct } from '@models/ProductModel';

export const fetchProductById = async (productId: number): Promise<IProduct> => {
    try {
        const response: AxiosResponse<IProduct> = await api.get(`/products/${productId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${productId}:`, error);
        throw error;
    }
};
