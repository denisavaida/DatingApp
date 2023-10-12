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
            return await _context.Products.SingleOrDefaultAsync(x=> x.Id == id);
        }

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
            // _context.Attach(prod);
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

        public async Task<IEnumerable<ProductCategory>> GetProductCategoryAsync(){
            return await _context.ProductCategory.ToListAsync();
        }
         
        public async Task<ProductCategory> AddProductCategory(ProductCategory category)
        {
            await _context.ProductCategory.AddAsync(category);
            return category;
        }

        public async Task<bool> CategoryExists(string name)
        {
            return await _context.ProductCategory.AnyAsync(c=>c.name == name.ToLower());
        }

        public async Task<ShoppingCart> GetShoppingCartByIdAsync(int id)
        {
            return await _context.ShoppingCart.SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<ShoppingCart> AddShoppingCartAsync(ShoppingCart shoppingCart)
        {
            await _context.ShoppingCart.AddAsync(shoppingCart);
            return shoppingCart;
        }
        public async Task<bool> ProductExistsInShoppingCart(int id)
        {
            return await _context.ShoppingCart.AnyAsync(x => x.Product.Any(y => y.Id == id));
        }
        public async Task<bool> ShoppingCartExists(int id){
            return await _context.ShoppingCart.AnyAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<ShoppingCart>> GetAllShoppingCart()
        {
            return await _context.ShoppingCart.Include(p=>p.Product).ToListAsync();
        }
    }
}