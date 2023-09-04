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
         public string Image { get; set; }
         public int Discount { get; set; }
         public List<ProductCategory> Categories { get; set;} = new List<ProductCategory>();
    }
}