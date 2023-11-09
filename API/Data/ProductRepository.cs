using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private DataContext _context;

        public ProductRepository(DataContext context){
            _context = context;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(p=>p.Images).SingleOrDefaultAsync(x=> x.Id == id);
        }

        // public async Task<IEnumerable<Photo>> GetPhotoByProdIdAsync(int id){
        //     return await _context.Photos.Where(x=>x.ProductId == id).ToListAsync();
        // }
        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.Include(p=>p.Images).ToListAsync();
 
        }

        public async Task<Product> AddProductAsync(Product product)
        {
             await _context.Products.AddAsync(product);
             return product;
        }

        public async Task<bool> ProductExists(string name)
        {
            return await _context.Products.AnyAsync(p=>p.Name == name);
        }
        public async void DeleteProduct(int id)
        {
            Product prod = await GetProductByIdAsync(id);
            _context.Products.Remove(prod);
            await _context.SaveChangesAsync();
            
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
             _context.Entry(product).State = EntityState.Modified;
         }


        // public async void DeletePhoto(int id)
        // {
        //     IEnumerable<Photo> photos = await GetPhotoByProdIdAsync(id);
        //     if(photos == null || !photos.Any() ){
        //         return;   
        //     }
        //     foreach(var p in photos){
        //         _context.Photos.Remove(p);
        //     }
        //     await _context.SaveChangesAsync();
            
        // }

    }
}