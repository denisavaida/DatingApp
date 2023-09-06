using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product        //Encapsulation
    {
         public int Id { get; set; }
         public string Name { get; set; }   
         public string Description { get; set; }
         public int Quantity { get; set; }
         public string Category { get; set;}
         public int OldPrice{ get; set; }
         public int Price{ get; set; }
         public List<Photo> Images{ get; set; } = new List<Photo>();
         public int Discount { get; set; }
         public List<ProductCategory> Categories { get; set;} = new List<ProductCategory>();

         public int GetDiscount(){
            return Price = CalculateDiscount(Discount, OldPrice);
         }
    }
}