using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Card")]
    public class Card : BaseEntity
    {
       public string Number{get;set;}
       public  int ExpiryMonth{get;set;}
       public int ExpiryYear{get;set;}
       public int CVV{get;set;}
        public string Name{get;set;}
        
        [ForeignKey("AppUserId")]
        public int AppUserId{get;set;} 
    }
}