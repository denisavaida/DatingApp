import { Adress } from "./adress";
import { ShoppingCart } from "./shopping-cart";

export interface Order{
    id: any;
    shoppingCart: ShoppingCart,
    deliveryAddress: Adress,
    billingAdress:Adress,
    payment:any,
    coupon:any,
}