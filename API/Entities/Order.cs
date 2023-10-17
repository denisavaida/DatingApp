using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mail;

namespace API.Entities
{
    [Table("Order")]
    public class Order
    {
        public int Id{get;set;}
        public ShoppingCart ShoppingCart{get;set;}
        public Delivery DeliveryOptions{get;set;}
        public DeliveryInfo DeliveryInfo{get;set;}
        public Payment PaymentMethod{get;set;}
        public string Coupon{get;set;}
    }
}