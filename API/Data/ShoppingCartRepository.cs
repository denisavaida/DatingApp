

using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private DataContext _context;

        public ShoppingCartRepository(DataContext context){
            _context = context;
        }
        public async Task<ShoppingCart> GetShoppingCartByUserIdAsync(int id)
        {
             var cartItem = await _context.ShoppingCart.SingleOrDefaultAsync(c => c.AppUserId == id);
             return cartItem;
        }
        public async Task<ShoppingCart> GetShoppingCartByProductIdAsync(int id)
        {
            var cartItem = await _context.ShoppingCart.SingleOrDefaultAsync(c => c.ProductId == id);
             return cartItem;
        }
        public async Task<ShoppingCart> GetShoppingCartByIdAsync(int id)
        {
            return await _context.ShoppingCart.SingleOrDefaultAsync(c => c.Id == id);
        }
        
        public async Task<IEnumerable<ShoppingCart>> GetUserShoppingCart(int id){
            return await _context.ShoppingCart.Include(p=>p.Product).Where(p=>p.AppUserId == id).ToListAsync();

        }
        public async Task<ShoppingCart> AddShoppingCartAsync(ShoppingCart shoppingCart)
        {
            await _context.ShoppingCart.AddAsync(shoppingCart);
            _context.Products.Attach(shoppingCart.Product);
            return shoppingCart;
        }
        public async Task<bool> ProductExistsInShoppingCart(int id)
        {
            return await _context.ShoppingCart.AnyAsync(x => x.ProductId == id);
        }
        public async Task<bool> ShoppingCartExists(int id){
            return await _context.ShoppingCart.AnyAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<ShoppingCart>> GetAllShoppingCart()
        {
            return await _context.ShoppingCart.Include(p=>p.ProductId).ToListAsync();
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Update(ShoppingCart cart)
        {
             _context.Entry(cart).State = EntityState.Modified;
         }
        
        public async void Delete(int id)
        {
            ShoppingCart prod = await GetShoppingCartByIdAsync(id);
            _context.ShoppingCart.Remove(prod);
            await _context.SaveChangesAsync();
            
        }


    }
}