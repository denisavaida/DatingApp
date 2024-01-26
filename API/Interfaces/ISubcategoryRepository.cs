using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ISubcategoryRepository
    {
        Task<IEnumerable<Subcategory>> GetSubcategoryAsync();
        Task<Subcategory> GetSubcategoryByIdAsync(int id);
        Task<IEnumerable<Subcategory>> GetSubcategoryByCategorySelectedAsync(int categoryId);
        Task<Subcategory> AddSubcategoryAsync(Subcategory subcategory);
        void Update(Subcategory category);
        void DeleteSubcategory(int id);
        Task<bool> SubcategoryExists(string name);
        Task<bool> SaveAllAsync();
    }
}