import { Product } from "./product";

export interface ShoppingCart{
    products: Product[] ,
    total: number,
    AppUserId: number
}