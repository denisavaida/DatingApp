import { Product } from "../_models/product";

export class FavouritesService{
    items: Product[] = [];
    constructor(){ }

    addToFavourites(prod: Product){
        this.items.push(prod);
    }
    getItems(){
        return this.items;
    }
    itemsCount(){
        return this.items.length;
    }
    clearFavourites(){
        this.items = [];
        return this.items;
    }
    deleteItem(id: any){
        for( var i=0; i< this.items.length; i++){
            if(this.items[i].id == id){
                this.items.splice(i,1);
            }
        }
    }
    findItem(prod:Product){
        var p = false; 
        this.items.forEach(element => {
            if(element.id == prod.id){
              p = true;  
            }
        });
        return p;
    }
   

}