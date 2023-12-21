import { Adress } from "./adress";

export interface DeliveryInfo{
    firstname: string,
    lastname:string,
    telephone:string,
    email:string,
    adress:Adress,
    adressId: number,
    additonalInfo:string,
    appUserId: number
}