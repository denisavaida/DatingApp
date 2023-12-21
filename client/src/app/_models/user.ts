import { Adress } from "./adress";
import { Order } from "./order";
import { Voucher } from "./voucher";

export interface User{
    id:number,
    userName: string,
    firstName: string,
    lastName:string,
    password: string,
    role: string,
    orders:Order[],
    vouchers: Voucher[],
    adress:Adress, 
    dateOfBirth: any
}