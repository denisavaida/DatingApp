using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Card")]
    public class Card
    {
        public int Id{get;set;}
       public string CardNumber{get;set;}
       public  int ExpiryMonth{get;set;}
       public int ExpiryYear{get;set;}
       public string CVV{get;set;}
        public string NameOnTheCard{get;set;}
    }
}