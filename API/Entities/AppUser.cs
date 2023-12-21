using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API;

[Table("Users")]
public class AppUser : BaseEntity
{    
    [Required]
    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string UserName { get; set;}

    public string FirstName{get;set;}

    public string LastName{get;set;}

    public byte[] PasswordHash { get; set;}

    public byte[] PasswordSalt { get; set;}

    public DateOnly DateOfBirth { get; set; }

    public Adress Adress{ get; set; }

    public string Role { get; set; }
    public List<Voucher> Vouchers{get;set;}
    public List<Order> Orders { get; set;} = new List<Order>();

}
