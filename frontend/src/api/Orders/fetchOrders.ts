import api from '../config/config';

export const getUserOrders = async (userToken: string) => {
    try {
        const response = await api.get('/orders/', {
            params: {
                user_token: userToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
