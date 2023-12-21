using API.Entities;

namespace API.Interfaces
{
    public interface IDeliveryRepository
    {
        Task<Delivery> GetDeliveryByIdAsync(int id);
        
        Task<DeliveryInfo> AddDeliveryInfoAsync(DeliveryInfo deliveryInfo);
        Task<Delivery> AddDeliveryAsync(Delivery delivery);
        Task<bool> DeliveryExists(string description);
        void Update(Delivery delivery);
        void DeleteDelivery(int id);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Delivery>> GetDeliveryAsync();
    }
}