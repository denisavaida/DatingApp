using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        
        void Update(Product product);
        Task<bool> SaveAllAsync();
        Task<Product> AddProductAsync(Product product);
        Task<ProductCategory> AddProductCategory(ProductCategory category);
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<bool> ProductExists(string name);
        Task<IEnumerable<ProductCategory>> GetProductCategoryAsync();
        Task<bool> CategoryExists(string name);
        Task<ShoppingCart> GetShoppingCartByIdAsync(int id);
        Task<IEnumerable<ShoppingCart>> GetAllShoppingCart();
        Task<bool> ProductExistsInShoppingCart(int id);
        Task<ShoppingCart> AddShoppingCartAsync(ShoppingCart shoppingCart);
        Task<bool> ShoppingCartExists(int id);
        void DeleteProduct(int id);
        void DeleteProductCategory(int id);
        void DeletePhoto(int id);
    }
}