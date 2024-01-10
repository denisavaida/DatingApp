using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

    [Table("ShoppingCart")]
    public class ShoppingCart : BaseEntity
    {
        public int Quantity {get;set;}

        [ForeignKey("ProductId")]
        public int ProductId {get;set;}
        public Product Product {get;set;}
        public float Subtotal { get; set; }

        [ForeignKey("AppUserId")]
        public int AppUserId { get; set; }
    }
}