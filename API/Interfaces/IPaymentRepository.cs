using API.Entities;

namespace API.Interfaces
{
    public interface IPaymentRepository
    {
            Task<Card> AddCardAsync(Card card);
            Task<bool> SaveAllAsync();
    }
}