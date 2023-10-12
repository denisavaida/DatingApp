import { Adress } from "./adress";
import { Order } from "./order";

export interface User{
    id:number,
    username: string,
    password: string,
    role: string,
    orders:Order[],
    adress:Adress
}