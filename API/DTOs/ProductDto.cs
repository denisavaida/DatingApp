using API.Entities;

namespace API.DTOs
{
    public class ProductDto : BaseEntity
    {    public string Name { get; set; }   
         public int Stock { get; set; }
         public int Quantity{get;set;}
         public int OldPrice{get;set;}
         public float Price{ get; set; }
         public string Image{ get; set; } 
         public string Discount{get;set;}
         public string Description{get;set;}
         public ProductCategory Category{get;set;}
         public CategoryGender CategoryGender{get;set;}
         public Subcategory Subcategory{get;set;}
         public int Rating{get;set;}

         public int GetQuantity(){
            Quantity = 1;
            return Quantity;
         }
    }
}