using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Order")]
    public class Order : BaseEntity
    {
        public Summary Summary{get;set;}

        [ForeignKey("SummaryId")]
        public int SummaryId{get;set;}
        public Delivery Delivery{get;set;}
        
        [ForeignKey("DeliveryId")]
        public int DeliveryId{get;set;}
        public DeliveryInfo DeliveryInfo{get;set;}

        [ForeignKey("DeliveryInfoId")]
        public int DeliveryInfoId{get;set;}
        public Card PaymentMethod{get;set;}

        [ForeignKey("PaymentMethodId")]
        public int PaymentMethodId{get;set;}
        public DateTime Date{get;set;}
        public Status Status{get;set;}
        
        [ForeignKey("StatusId")]
        public int StatusId{get;set;}
        
        [ForeignKey("AppUserId")]
        public int AppUserId{get;set;} 
    }
}