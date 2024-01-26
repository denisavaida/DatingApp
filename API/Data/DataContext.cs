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
    // public DbSet<Products> Products2{ get; set; }
    public DbSet<Adress> Adresses{ get; set; }
    public DbSet<Photo> Photos{get;set;}
    public DbSet<Favourites> Favourites{get;set;}
    public DbSet<ProductCategory> ProductCategories{ get; set; }
    public DbSet<ShoppingCart> ShoppingCartItems{ get; set; }
    public DbSet<Delivery> Delivery{get;set;}
    public DbSet<DeliveryInfo> DeliveryInfo{get;set;}
    public DbSet<Voucher> Vouchers{get;set;}
    public DbSet<Order> Orders{get;set;}
    public DbSet<Card> Cards{get;set;}
    public DbSet<Summary> Summaries{get;set;}
    public DbSet<Status> Status{get;set;}
    public DbSet<Subscribtion> Subscriptions{get;set;}
    public DbSet<CategoryGender> CategoryGender{get;set;}
    public DbSet<Subcategory> Subcategory{get;set;}

}
