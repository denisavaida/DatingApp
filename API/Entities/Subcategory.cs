using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Subcategory")]
    public class Subcategory: BaseEntity
    {
        public string Name { get; set; }

        [ForeignKey("ProductCategoryId")]
        public int ProductCategoryId{get;set;}

    }
}