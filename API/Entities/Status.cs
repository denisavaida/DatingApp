using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Status")]
    public class Status : BaseEntity
    {
        public string Name{get;set;} 
    }
}