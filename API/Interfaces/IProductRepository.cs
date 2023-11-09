using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        
        void Update(Product product);
        Task<bool> SaveAllAsync();
        Task<Product> AddProductAsync(Product product);
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<bool> ProductExists(string name);
        void DeleteProduct(int id);
    }
}