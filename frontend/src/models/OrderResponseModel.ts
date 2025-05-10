import { IProduct } from "./ProductModel";

export interface OrderResponseModel {
    user_token: string;
    country: string;
    city: string;
    name: string;
    items: {
        product: IProduct;
        quantity: number;
    }[];
}
