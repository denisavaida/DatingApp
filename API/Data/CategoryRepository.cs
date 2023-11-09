
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private DataContext _context;

        public CategoryRepository(DataContext context){
            _context = context;
        }

        
        public async Task<IEnumerable<ProductCategory>> GetCategoryAsync(){
            return await _context.ProductCategory.ToListAsync();
        }
         
        public async Task<ProductCategory> AddCategory(ProductCategory category)
        {
            await _context.ProductCategory.AddAsync(category);
            return category;
        }
        // public async Task<ProductCategory> GetCategoryByProdIdAsync(int id){
        //     return await _context.ProductCategory.SingleOrDefaultAsync(x=>x.ProductId == id);
        // }

        // public async void DeleteProductCategory(int id)
        // {
        //     ProductCategory prod = await GetCategoryByProdIdAsync(id);
        //     if(prod != null){
        //         _context.ProductCategory.Remove(prod);
        //         await _context.SaveChangesAsync();
        //     }
            
        // }

        public async Task<bool> CategoryExists(string name)
        {
            return await _context.ProductCategory.AnyAsync(c=>c.Name == name.ToLower());
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}