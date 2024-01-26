using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CategoryGenderRepository : ICategoryGenderRepository
    {
        private DataContext _context;

        public CategoryGenderRepository(DataContext context){
            _context = context;
        }

        public async Task<IEnumerable<CategoryGender>> GetCategoryGenderAsync()
        {
            return await _context.CategoryGender.ToListAsync();
        }
         public async Task<CategoryGender> GetCategoryGenderByIdAsync(int id){
            return await _context.CategoryGender.SingleOrDefaultAsync(x=> x.Id == id);
         }
        public async Task<CategoryGender> AddCategoryGenderAsync(CategoryGender categGender)
        {
            await _context.CategoryGender.AddAsync(categGender);
            return categGender;
        }
        public async Task<bool> CategoryGenderExists(string name)
        {
            return await _context.CategoryGender.AnyAsync(c=>c.Name == name.ToLower());
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(CategoryGender categoryGender)
        {
            _context.Entry(categoryGender).State = EntityState.Modified;
        }

        public async void DeleteCategoryGender(int id)
        {
        CategoryGender del = await GetCategoryGenderByIdAsync(id);
        _context.CategoryGender.Remove(del);
        await _context.SaveChangesAsync();
        }
    }
}