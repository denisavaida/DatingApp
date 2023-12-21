import { Product } from "./product";

export interface ShoppingCart{
    id:number,
    quantity: number,
    subtotal: number,
    AppUserId: number, 
    productId: number,
    product: Product
}