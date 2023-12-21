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
    public DbSet<Adress> Adresses{ get; set; }
    public DbSet<Photo> Photos{get;set;}
    public DbSet<Favourites> Favourites{get;set;}
    public DbSet<ProductCategory> ProductCategory{ get; set; }
    public DbSet<ShoppingCart> ShoppingCart{ get; set; }
    public DbSet<Delivery> Delivery{get;set;}
    public DbSet<DeliveryInfo> DeliveryInfo{get;set;}
    public DbSet<Voucher> Vouchers{get;set;}
    public DbSet<Order> Orders{get;set;}
    public DbSet<Card> Cards{get;set;}
    public DbSet<Summary> Summary{get;set;}
    public DbSet<Status> Status{get;set;}

}
