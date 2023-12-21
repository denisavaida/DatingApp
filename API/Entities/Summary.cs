using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Summary")]
    public class Summary : BaseEntity
    {   

        [ForeignKey("AppUserId")]
        public int AppUserId{ get; set; }
        public float ProductCost{get;set;} // 208 lei
        public float Discounted{get;set;} // -103 lei
        public float Total{ get; set; }    // 208 - 103 = 105 lei
        public List<ShoppingCart> ShoppingCartItems{get;set;}  

        [ForeignKey("ShoppingCartId")]
        public int ShoppingCartId{get;set;}

        [ForeignKey("VoucherId")]
        public int VoucherId{get;set;}
    }
    
}