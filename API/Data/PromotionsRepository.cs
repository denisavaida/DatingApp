using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PromotionsRepository : IPromotionsRepository
    {
        private DataContext _context;

        public PromotionsRepository(DataContext context){
            _context = context;
        }

        
        public async Task<PagedList<Product>> GetPromoProductsAsync(ProductParams productParams)
        {
            var query =   _context.Products.Include(p=>p.Images).Where(p=>p.Discount > 0).OrderByDescending(p=>p.Stock)
                            .AsNoTracking(); //meant for read operations

             return await  PagedList<Product>.CreateAsync(query, productParams.PageNumber, productParams.PageSize);

        }

        public async Task<bool> SaveAllAsync()
        {
             return await _context.SaveChangesAsync() > 0;
        }
    }
}