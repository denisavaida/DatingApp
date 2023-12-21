using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Measurement : BaseEntity
    {
        public string Name { get; set; }
        public ProductCategory Category{get; set;}
        
        [ForeignKey("ProductId")]
        public int ProductId { get; set; }
    }
}