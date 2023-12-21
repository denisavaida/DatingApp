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
         public string Category{get;set;}

         public int GetQuantity(){
            Quantity = 1;
            return Quantity;
         }

        public static implicit operator ProductDto(Product v)
        {
            throw new NotImplementedException();
        }
    }
}