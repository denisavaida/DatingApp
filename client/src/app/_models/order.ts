import { Card } from "./card";
import { Delivery } from "./delivery";
import { DeliveryInfo } from "./deliveryInfo";
import { Payment } from "./payment";
import { Summary } from "./summary";

export interface Order{
    id: number;
    summary: Summary,
    deliveryMethod: Delivery,
    deliveryInfo:DeliveryInfo,
    paymentMethod:Card,
    coupon:string,
}