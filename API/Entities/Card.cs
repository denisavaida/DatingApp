using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Card")]
    public class Card
    {
        public int Id{get;set;}
       public int Number{get;set;}
       public  int ExpiryMonth{get;set;}
       public int ExpiryYear{get;set;}
       public int CVV{get;set;}
        public string Name{get;set;}
    }
}