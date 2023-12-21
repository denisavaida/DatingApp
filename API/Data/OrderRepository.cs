using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class OrderRepository : IOrderRepository
    {
        private DataContext _context;

        public OrderRepository(DataContext context){
            _context = context;
        }

        public async Task<Order> AddOrderAsync(Order order)
        {
             await _context.Orders.AddAsync(order);
             return order;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}