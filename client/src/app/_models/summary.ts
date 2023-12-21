import { ShoppingCart } from "./shopping-cart";
import { Voucher } from "./voucher";

export interface Summary{
    AppUserId: number,
    productCost:number,
    discounted: number,
    total: number,
    shoppingCartItems: ShoppingCart[],
    voucherID: number
}