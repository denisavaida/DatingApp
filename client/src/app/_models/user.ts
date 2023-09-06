import {ShoppingCart } from "./shopping-cart";

export interface User{
    id:Int16Array,
    username: string,
    token: string,
    role: string,
    orders:ShoppingCart[]
}