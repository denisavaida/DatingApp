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
        Task<IEnumerable<Subscribtion>> GetSubscribersAsync();
        Task<AppUser> AddUserAsync(AppUser user);
        Task<Adress> AddAdressAsync(Adress adress);
        Task<Subscribtion> AddSubscriptionAsync(Subscribtion subscribtion);
        Task<bool> UserExists(string username);
        
    }
}