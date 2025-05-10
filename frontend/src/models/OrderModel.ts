export interface OrderModel {
    user_token?: string;
    country: string;
    city: string;
    name: string;
    items: {
        product: number;
        quantity: number;
    }[];
}