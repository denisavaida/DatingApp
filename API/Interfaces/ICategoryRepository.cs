using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<ProductCategory>> GetCategoryAsync();
        Task<ProductCategory> AddCategory(ProductCategory category);
        Task<bool> CategoryExists(string name);
        Task<bool> SaveAllAsync();
    }
}