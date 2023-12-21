using API.Entities;

namespace API.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<ProductCategory>> GetCategoryAsync();
        Task<IEnumerable<Product>> GetProductsBySelectedCategoryAsync(string categ);
        Task<ProductCategory> AddCategory(ProductCategory category);
        Task<bool> CategoryExists(string name);
        Task<bool> SaveAllAsync();
    }
}