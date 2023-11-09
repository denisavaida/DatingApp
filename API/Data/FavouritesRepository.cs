using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FavouritesRepository : IFavouritesRepository
    {
        private DataContext _context;

        public FavouritesRepository(DataContext context){
            _context = context;
        }

        public async Task<IEnumerable<Favourites>> GetAllFavouritesAsync()
        {
            return await _context.Favourites.ToListAsync();
        }
        public async Task<Favourites> AddFavouritesAsync(Favourites fav)
        {
            await _context.Favourites.AddAsync(fav);
            // _context.Products.Attach(fav.Product);
            return fav;
        }
        public async Task<Favourites> GetFavouritesByProdIdAsync(int id)
        {
            return await _context.Favourites.SingleOrDefaultAsync(c => c.ProductId == id);
        }
        
        public async Task<Favourites> GetFavouritesByProductIdAsync(int id)
        {
            var item = await _context.Favourites.SingleOrDefaultAsync(c => c.ProductId == id);
             return item;
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

         public async Task<bool> FavouritesExists(int id){
            return await _context.Favourites.AnyAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Favourites>> GetUserFavourites(int id)
        {
             return await _context.Favourites.Where(p=>p.AppUserId == id).ToListAsync();
        }

        public async void Delete(int id)
        {
            Favourites fav = await GetFavouritesByProdIdAsync(id);
            _context.Favourites.Remove(fav);
            await _context.SaveChangesAsync();
        }
    }
}