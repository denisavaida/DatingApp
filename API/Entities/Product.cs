using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using API.DTOs;

namespace API.Entities
{
    [Table("Product")]
    public class Product        //Encapsulation
    {
         public int Id { get; set; }
         public string Name { get; set; }   
         public string Description { get; set; }
         public int Quantity { get; set; }
         public int Stock{get;set;}
         public string Category { get; set;}
         public int OldPrice{ get; set; }
         public float Price{ get; set; }
        
        //  public string Color{get;set;}
        //  public List<Color> Colors{get;set;}
        //  public string Measurement{get;set;}
        //  public List<Measurement> Measurements{get;set;}
         public string Image{get;set;}
         public List<Photo> Images{ get; set; } 
         public int Discount { get; set; }
         public int ShoppingCartId{ get; set; }
         public List<ProductCategory> Categories { get; set;}
         public float Subtotal{get; set;}
         public float GetPrice(int oldPrice, int discount)
        {
            if(discount == 0){
                Price = OldPrice;
            }else{
                Price = (int)(oldPrice - oldPrice * discount/100);
            }
            return Price;
         }
         public int GetQuantity(){
            Quantity = 1;
            return Quantity;
         }
         public float GetSubtotal(){
            Subtotal = Price * Quantity;
            return Subtotal;
         }
       
    }
}