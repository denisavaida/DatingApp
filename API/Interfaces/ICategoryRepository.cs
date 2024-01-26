using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<ProductCategory>> GetCategoryAsync();
        Task<ProductCategory> GetCategoryByNameAsync(string categ);
        Task<ProductCategory> AddCategoryAsync(ProductCategory category);
        void Update(ProductCategory category);
        void DeleteCategory(int id);
        Task<bool> CategoryExists(string name);
        Task<bool> SaveAllAsync();
    }
}