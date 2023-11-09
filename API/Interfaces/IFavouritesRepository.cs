using API.Entities;

namespace API.Interfaces
{
    public interface IFavouritesRepository
    {
        Task<IEnumerable<Favourites>> GetAllFavouritesAsync();
        Task<IEnumerable<Favourites>> GetUserFavourites(int id);
        Task<Favourites> AddFavouritesAsync(Favourites fav);
        Task<Favourites> GetFavouritesByProductIdAsync(int id);
        Task<bool> SaveAllAsync();
        Task<bool> FavouritesExists(int id);
        void Delete(int id);
        
    }
}