using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Order")]
    public class Order : BaseEntity
    {
        public ShoppingCart ShoppingCart{get;set;}
        public Delivery DeliveryOptions{get;set;}
        public DeliveryInfo DeliveryInfo{get;set;}
        public Card PaymentMethod{get;set;}
        public string Coupon{get;set;}
    }
}