using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        
        void Update(Product product);
        Task<bool> SaveAllAsync();
        Task<Product> AddProductAsync(Product product);
        Task<PagedList<Product>> GetProductsAsync(ProductParams productParams);
        Task<IEnumerable<Product>> GetProductsBySelectedCategoryAsync(string category);
        Task<IEnumerable<Product>> GetProductsByRangeAsync(int minPrice, int maxPrice);
        Task<IEnumerable<Product>> GetProductsBySortingTypeAsync(string type);
         Task<IEnumerable<Product>> GetInStockProductsAsync();
        Task<PagedList<Product>> GetOutOfStockProducts(ProductParams productParams);
        Task<Product> GetProductByIdAsync(int id);
        // Task<Product> GetProductsByUserIdAsync(int id);
        Task<bool> ProductExists(string name);
        void DeleteProduct(int id);
        IQueryable<Product> Query(IEnumerable<Product> products);
    }
}