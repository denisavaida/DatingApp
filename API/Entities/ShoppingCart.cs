using System.ComponentModel.DataAnnotations.Schema;
using API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{

    [Table("ShoppingCart")]
    public class ShoppingCart
    {
        public int Id { get; set; }
        public List<Product> Product{ get; set; }
        public float Total{ get; set; }

        [ForeignKey("AppUserId")]
        public int AppUserId{ get; set; }
        public UserDto AppUser{ get; set; }
    }
}