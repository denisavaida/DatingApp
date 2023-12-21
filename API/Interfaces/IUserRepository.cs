using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<Adress> GetAdressByUserId(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<AppUser> AddUserAsync(AppUser user);
        Task<Adress> AddAdressAsync(Adress adress);
        Task<bool> UserExists(string username);
        
    }
}