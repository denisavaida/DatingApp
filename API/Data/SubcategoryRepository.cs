using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SubcategoryRepository : ISubcategoryRepository
    {
        private DataContext _context;

        public SubcategoryRepository(DataContext context){
            _context = context;
        }

        public async Task<IEnumerable<Subcategory>> GetSubcategoryAsync()
        {
            return await _context.Subcategory.ToListAsync();
        }
        public async Task<Subcategory> GetSubcategoryByIdAsync(int id){
            return await _context.Subcategory.SingleOrDefaultAsync(x=> x.Id == id);
         }
        public async Task<IEnumerable<Subcategory>> GetSubcategoryByCategorySelectedAsync(int categoryId)
        {
            return await _context.Subcategory.Where(s => s.ProductCategoryId == categoryId).ToListAsync();
        }
        public async Task<Subcategory> AddSubcategoryAsync(Subcategory subcategory)
        {
            await _context.Subcategory.AddAsync(subcategory);
            return subcategory;
        }
        public void Update(Subcategory category)
        {
            _context.Entry(category).State = EntityState.Modified;
        }

        public async void DeleteSubcategory(int id)
        {
        Subcategory del = await GetSubcategoryByIdAsync(id);
        _context.Subcategory.Remove(del);
        await _context.SaveChangesAsync();
        }

        public async Task<bool> SubcategoryExists(string name)
        {
            return await _context.Subcategory.AnyAsync(c=>c.Name == name.ToLower());
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }


    }
}