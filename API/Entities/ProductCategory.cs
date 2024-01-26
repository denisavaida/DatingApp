using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("ProductCategory")]
    public class ProductCategory : BaseEntity
    {
        public string Name { get; set; }
        public IList<Subcategory> Subcategories{get;set;}

    }
}