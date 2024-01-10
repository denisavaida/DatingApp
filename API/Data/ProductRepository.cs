using API.Entities;
using API.Helpers;
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
        public async Task<PagedList<Product>> GetProductsAsync(ProductParams productParams)
        {
            var query = _context.Products.Include(p=>p.Images).Include(p=> p.Categories).OrderByDescending(p=>p.Stock)
                            .AsNoTracking(); //meant for read operations
            return await  PagedList<Product>.CreateAsync(query, productParams.PageNumber, productParams.PageSize);
        }
        
        public async Task<IEnumerable<Product>> GetProductsSearchAsync(string searchItem)
        {
            var query = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories)
            .Where(p=>p.Name.Contains(searchItem)).ToListAsync();
                            
            return query;
        }

        public async Task<IEnumerable<Product>> GetProductsBySelectedCategoryAsync(string category)
        {
           var query = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Category == category.ToLower()).OrderByDescending(p=>p.Stock).ToListAsync();
                            
            return query;
        }
        public async Task<IEnumerable<Product>> GetProductsByRangeAsync(int minPrice, int maxPrice)
        {
            var query = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Price> minPrice && p.Price < maxPrice).OrderByDescending(p=>p.Stock).ToListAsync();
                            
            return query;
        }
        public async Task<IEnumerable<Product>> GetProductsBySortingTypeAsync(string type)
        {
            IEnumerable<Product> prods = new Product[]{};
            if(type =="ascending"){
                prods = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Stock > 0).OrderBy(p=>p.Price).ToListAsync();
            }else if(type=="descending"){
                prods = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Stock > 0).OrderByDescending(p=>p.Price).ToListAsync();
            }else if(type=="discount"){
                prods = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Stock > 0).OrderByDescending(p=>p.Discount).ToListAsync();
            }else if(type=="popular"){
                prods = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Stock > 0).OrderByDescending(p=>p.Rating).ToListAsync();
            }
           
            return prods;
        }

        public async Task<IEnumerable<Product>> GetInStockProductsAsync()
        {
            var prods = await _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Stock > 0 ).ToListAsync();
            return prods;
        }

        public async Task<PagedList<Product>> GetOutOfStockProducts(ProductParams productParams){
             var prods =  _context.Products.Include(p=>p.Images).Include(p=> p.Categories).Where(p=>p.Stock == 0).AsNoTracking();
             return await  PagedList<Product>.CreateAsync(prods, productParams.PageNumber, productParams.PageSize);
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

        public IQueryable<Product> Query(IEnumerable<Product> products)
        {
            return products.AsQueryable();
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