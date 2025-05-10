import { IProduct } from "./ProductModel";

export interface OrderResponseModel {
    user_token: string;
    country: string;
    city: string;
    name: string;
    phone: string;
    created_at: string;
    items: {
        product: IProduct;
        quantity: number;
    }[];
}
