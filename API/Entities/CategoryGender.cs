using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("CategoryGender")]
    public class CategoryGender: BaseEntity
    {
         public string Name { get; set; }

        
    }
}
