using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto : BaseEntity
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string UserName { get; set;}
        public string FirstName{get;set;}
        public string LastName{get;set;}
        public DateOnly DateOfBirth { get; set; }
        public Adress Adress{ get; set; }
        public string Role { get; set; }
        public List<ShoppingCart> Orders { get; set;} 
        public List<Voucher> Vouchers{get;set;}
    }
}