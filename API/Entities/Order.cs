using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Order")]
    public class Order : BaseEntity
    {
        public Summary Summary{get;set;}
        public Delivery Delivery{get;set;}
        public DeliveryInfo DeliveryInfo{get;set;}
        public Card PaymentMethod{get;set;}
        public DateTime Date{get;set;}
        public Status Status{get;set;}
        
        [ForeignKey("AppUserId")]
        public int AppUserId{get;set;} 
    }
}