using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options): base(options)
    {    
    }
    public DbSet<AppUser> Users{ get; set; }

    public DbSet<Product> Products{ get; set; }
    
    public DbSet<ProductCategory> ProductCategory{ get; set; }

}
