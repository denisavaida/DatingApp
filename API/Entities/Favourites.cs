using System.ComponentModel.DataAnnotations.Schema;
using API.DTOs;

namespace API.Entities
{

    [Table("Favourites")]
    public class Favourites : BaseEntity
    {   public List<Product> Product{ get; set; }
        public int ProductId{get;set;}

        [ForeignKey("AppUserId")]
        public int AppUserId{ get; set; }
    }
}