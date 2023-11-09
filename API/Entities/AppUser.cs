using API.Entities;

namespace API;

public class AppUser : BaseEntity
{    
    public string UserName { get; set;}

    public byte[] PasswordHash { get; set;}

    public byte[] PasswordSalt { get; set;}

    public DateOnly DateOfBirth { get; set; }

    public Adress Adress{ get; set; }

    public string Role { get; set; }

    public List<Order> Orders { get; set;} = new List<Order>();

}
