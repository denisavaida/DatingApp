using API.Entities;

namespace API.DTOs
{
    public class ProductDto
    {
         public int Id { get; set; }
         public string Name { get; set; }   
         public int Stock { get; set; }
         public int Quantity{get;set;}
         public int OldPrice{get;set;}
         public float Price{ get; set; }
         public string Image{ get; set; } 
         public string Discount{get;set;}
         public string Description{get;set;}
         public string Category{get;set;}

         public float Subtotal{get;set;}

         public int GetQuantity(){
            Quantity = 1;
            return Quantity;
         }
         public float GetSubtotal(){
            Subtotal = Quantity * Price;
            return Subtotal;
         }

        public static implicit operator ProductDto(Product v)
        {
            throw new NotImplementedException();
        }
    }
}