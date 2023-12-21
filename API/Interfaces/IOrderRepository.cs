using API.Entities;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
            Task<Order> AddOrderAsync(Order order);
            Task<bool> SaveAllAsync();
    }
}