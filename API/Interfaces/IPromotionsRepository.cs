using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPromotionsRepository
    {
        Task<bool> SaveAllAsync();
        Task<PagedList<Product>> GetPromoProductsAsync(ProductParams productParams);
    }
}