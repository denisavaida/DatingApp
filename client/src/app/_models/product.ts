import { Category } from "./category";
import { CategoryGender } from "./category-gender";
import { Photo } from "./photo";
import { Subcategory } from "./subcategory";

export interface Product{
    id:number,
    name: string,
    description: string,
    quantity: number,
    category: Category,
    categoryGender: CategoryGender,
    subcategory:Subcategory,
    oldPrice: number,
    price: number,
    image: string,
    stock: number,
    images: Photo[],
    discount: number,
    softDeleted:boolean,
    rating: number
}