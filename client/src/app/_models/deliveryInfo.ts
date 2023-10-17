import { Adress } from "./adress";

export interface DeliveryInfo{
    id: number;
    firstname: string,
    lastname:string,
    telephone:number,
    email:string,
    adress:Adress,
    additonalInfo:string
}