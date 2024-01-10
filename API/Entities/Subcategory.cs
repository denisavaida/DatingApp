using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Subcategory")]
    public class Subcategory: BaseEntity
    {
        public string Name { get; set; }

        [ForeignKey("CategoryId")]
        public int CategoryId{get;set;}
        
        [ForeignKey("ProductId")]
        public int ProductId { get; set; }

    }
}