using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class PaymentRepository : IPaymentRepository
    {
        private DataContext _context;

        public PaymentRepository(DataContext context){
            _context = context;
        }
        public async Task<Card> AddCardAsync(Card card)
        {
            await _context.Cards.AddAsync(card);
            return card;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}