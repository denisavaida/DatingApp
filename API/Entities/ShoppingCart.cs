using System.ComponentModel.DataAnnotations.Schema;
using API.DTOs;

namespace API.Entities
{

    [Table("ShoppingCart")]
    public class ShoppingCart
    {
        public int Id { get; set; }
        public List<Product> Product{ get; set; }
        public int ProductId{get;set;}
        public float Total{ get; set; }

        [ForeignKey("AppUserId")]
        public int AppUserId{ get; set; }
        public UserDto AppUser{ get; set; }
    }
}