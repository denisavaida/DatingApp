using API.Entities;

namespace API.Interfaces
{
    public interface ICategoryGenderRepository
    {
        Task<IEnumerable<CategoryGender>> GetCategoryGenderAsync();
        Task<CategoryGender> GetCategoryGenderByIdAsync(int id);
        Task<CategoryGender> AddCategoryGenderAsync(CategoryGender categGender);
        void Update(CategoryGender categoryGender);
        void DeleteCategoryGender(int id);
        Task<bool> CategoryGenderExists(string name);
        Task<bool> SaveAllAsync();
    }
}