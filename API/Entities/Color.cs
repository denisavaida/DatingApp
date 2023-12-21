using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Color : BaseEntity
    {
        public string Name { get; set; }
        
        [ForeignKey("ProductId")]
        public int ProductId { get; set; }
    }
}