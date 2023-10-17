import { Delivery } from "./delivery";
import { DeliveryInfo } from "./deliveryInfo";
import { Payment } from "./payment";
import { ShoppingCart } from "./shopping-cart";

export interface Order{
    id: number;
    shoppingCart: ShoppingCart,
    deliveryMethod: Delivery,
    deliveryInfo:DeliveryInfo,
    paymentMethod:Payment,
    coupon:string,
}