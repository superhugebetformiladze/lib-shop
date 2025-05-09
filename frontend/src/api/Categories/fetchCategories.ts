import { AxiosResponse } from 'axios';
import api from '../config/config';
import { ICategory } from '@models/CategoryModel';

export const fetchCategories = async (): Promise<ICategory[]> => {
    try {
        const response: AxiosResponse<ICategory[]> = await api.get('/categories/');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
