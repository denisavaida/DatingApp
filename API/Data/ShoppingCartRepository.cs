

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
             var cartItem = await _context.ShoppingCartItems.SingleOrDefaultAsync(c => c.AppUserId == id);
             return cartItem;
        }
        public async Task<ShoppingCart> GetShoppingCartByProductIdAsync(int id)
        {
            var cartItem = await _context.ShoppingCartItems.SingleOrDefaultAsync(c => c.Product.Id == id);
             return cartItem;
        }
        public async Task<ShoppingCart> GetShoppingCartByIdAsync(int id)
        {
            return await _context.ShoppingCartItems.SingleOrDefaultAsync(c => c.Id == id);
        }
        
        public async Task<IEnumerable<ShoppingCart>> GetUserShoppingCart(int id){
            return await _context.ShoppingCartItems.Include(p=>p.Product).Where(p=>p.AppUserId == id).ToListAsync();

        }
        public async Task<ShoppingCart> AddShoppingCartAsync(ShoppingCart shoppingCart)
        {
            await _context.ShoppingCartItems.AddAsync(shoppingCart);
            // _context.Products.Attach(shoppingCart.Product);
            return shoppingCart;
        }
        public async Task<bool> ProductExistsInShoppingCart(int id)
        {
            return await _context.ShoppingCartItems.AnyAsync(x => x.Product.Id == id);
        }
        public async Task<bool> ShoppingCartExists(int id){
            return await _context.ShoppingCartItems.AnyAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<ShoppingCart>> GetAllShoppingCart()
        {
            return await _context.ShoppingCartItems.Include(p=>p.Product).ToListAsync();
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
            _context.ShoppingCartItems.Remove(prod);
            await _context.SaveChangesAsync();  
        }
        public async void ClearShoppingCartByUserId(int userId)
        {
            var cart = GetUserShoppingCart(userId).Result;
            foreach(var elem in cart){
                _context.ShoppingCartItems.Remove(elem);
                await _context.SaveChangesAsync();
            }
        }
    }
}