import { ICategory } from "./CategoryModel";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: ICategory;
}
