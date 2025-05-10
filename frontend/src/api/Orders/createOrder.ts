import api from '../config/config';
import { OrderModel } from '@models/OrderModel';

export const createOrder = async (orderData: OrderModel) => {
    const response = await api.post('/orders/', orderData);
    return response.data;
};