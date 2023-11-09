using System.ComponentModel.DataAnnotations.Schema;
using API.DTOs;

namespace API.Entities
{
    [Table("Photo")]
    public class Photo : BaseEntity
    {
        public string Url { get; set; }
        public bool IsMain{ get; set; }
        public int ProductId {get;set;}
    }
}