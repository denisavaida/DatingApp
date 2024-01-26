using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Product")]
    public class Product  : BaseEntity   
    {         
         public string Name { get; set; }   
         public string Description { get; set; }
         public int Quantity { get; set; }
         public int Stock{get;set;}
         public ProductCategory Category { get; set;}
         public CategoryGender CategoryGender{get;set;}
         public Subcategory Subcategory{get;set;}         
         public int OldPrice{ get; set; }
         public float Price{ get; set; }
        
        //  public string Color{get;set;}
        //  public List<Color> Colors{get;set;}
        //  public string Measurement{get;set;}
        //  public List<Measurement> Measurements{get;set;}
         public string Image{get;set;}
         public List<Photo> Images{ get; set; } 
         public bool SoftDeleted{get;set;}
         public int Discount { get; set; }
         public int Rating{get; set;}
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
       
       public bool GetSoftDeleted(){
            SoftDeleted = false;
            return SoftDeleted;
       }
    }
}