using API.Entities;

namespace API.Interfaces
{
    public interface IShoppingCartRepository
    {
        
        Task<ShoppingCart> GetShoppingCartByUserIdAsync(int id);
        Task<ShoppingCart> GetShoppingCartByProductIdAsync(int id);
        Task<ShoppingCart> GetShoppingCartByIdAsync(int id);
        Task<IEnumerable<ShoppingCart>> GetAllShoppingCart();
        Task<IEnumerable<ShoppingCart>> GetUserShoppingCart(int id);
        Task<bool> ProductExistsInShoppingCart(int id);
        Task<ShoppingCart> AddShoppingCartAsync(ShoppingCart shoppingCart);
        Task<bool> ShoppingCartExists(int id);
        Task<bool> SaveAllAsync();
        void Update(ShoppingCart cart);
        void Delete(int id);
        void ClearShoppingCartByUserId(int id);
    }
}