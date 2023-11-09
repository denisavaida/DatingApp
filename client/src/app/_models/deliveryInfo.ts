import { Adress } from "./adress";

export interface DeliveryInfo{
    firstname: string,
    lastname:string,
    telephone:string,
    email:string,
    adress:Adress,
    additonalInfo:string
}