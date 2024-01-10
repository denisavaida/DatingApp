import { Photo } from "./photo";

export interface Product{
    id:number,
    name: string,
    description: string,
    quantity: number,
    category: string,
    oldPrice: number,
    price: number,
    image: string,
    stock: number,
    images: Photo[],
    discount: number,
    shoppingCartId: number,
    softDeleted:boolean,
    rating: number
}