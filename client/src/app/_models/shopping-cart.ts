import { Product } from "./product";
import { Summary } from "./summary";

export interface ShoppingCart{
    id:number,
    quantity: number,
    subtotal: number,
    AppUserId: number, 
    product: Product,
    summary:Summary
}