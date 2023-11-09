import { ShoppingCart } from "./shopping-cart";

export interface Summary{
    AppUserId: number,
    total: number,
    shoppingCartItems: ShoppingCart[]
}