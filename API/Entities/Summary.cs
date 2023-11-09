using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Summary")]
    public class Summary : BaseEntity
    {   

        [ForeignKey("AppUserId")]
        public int AppUserId{ get; set; }
        public float Total{ get; set; }
        public List<ShoppingCart> ShoppingCartItems{get;set;}  
    }
    
}