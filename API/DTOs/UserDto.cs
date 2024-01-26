using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class UserDto : BaseEntity
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Username{ get; set; }
        public string Role{get;set;}
        public string Token{ get; set; }
    }
}