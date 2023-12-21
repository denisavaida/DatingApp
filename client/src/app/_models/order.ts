import { Card } from "./card";
import { Delivery } from "./deliveryMethod";
import { DeliveryInfo } from "./deliveryInfo";
import { Summary } from "./summary";
import { Status } from "./Status";

export interface Order{
    id: number,
    date: Date,
    status: Status,
    summary: Summary,
    delivery: Delivery,
    deliveryInfo:DeliveryInfo,
    paymentMethod:Card,
    appUserId: number
}