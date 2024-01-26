using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

    [Table("Favourites")]
    public class Favourites : BaseEntity
    {   
        [ForeignKey("ProductId")]
        public int ProductId{get;set;}

        [ForeignKey("AppUserId")]
        public int AppUserId{ get; set; }
    }
}