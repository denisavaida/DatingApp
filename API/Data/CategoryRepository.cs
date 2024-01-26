
using API.DTOs;
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
            return await _context.ProductCategories.ToListAsync();
        }

        public async Task<ProductCategory> GetCategoryByNameAsync(string categ)
        {
            return await _context.ProductCategories.SingleOrDefaultAsync(p=>p.Name == categ);
                     
        }

         public async Task<ProductCategory> GetCategoryByIdAsync(int id){
            return await _context.ProductCategories.SingleOrDefaultAsync(x=> x.Id == id);
         }
        public async Task<ProductCategory> AddCategoryAsync(ProductCategory category)
        {
            await _context.ProductCategories.AddAsync(category);
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
        public void Update(ProductCategory category)
        {
            _context.Entry(category).State = EntityState.Modified;
        }

        public async void DeleteCategory(int id)
        {
        ProductCategory del = await GetCategoryByIdAsync(id);
        _context.ProductCategories.Remove(del);
        await _context.SaveChangesAsync();
        }
        public async Task<bool> CategoryExists(string name)
        {
            return await _context.ProductCategories.AnyAsync(c=>c.Name == name.ToLower());
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }


    }
}