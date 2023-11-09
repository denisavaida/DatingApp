import { Product } from "./product";

export interface Favourites{
    products: Product[] ,
    AppUserId: number,
    ProductId: number
}