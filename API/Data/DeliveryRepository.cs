using API;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

public class DeliveryRepository : IDeliveryRepository
{
    private DataContext _context;

    public DeliveryRepository(DataContext context){
        _context = context;
    }

    public async Task<Delivery> GetDeliveryByIdAsync(int id)
    {
        return await _context.Delivery.SingleOrDefaultAsync(x=> x.Id == id);
    }

    public async Task<Delivery> AddDeliveryAsync(Delivery delivery)
    {
            await _context.Delivery.AddAsync(delivery);
            return delivery;
    }
    public async Task<DeliveryInfo> AddDeliveryInfoAsync(DeliveryInfo deliveryInfo)
    {
            await _context.DeliveryInfo.AddAsync(deliveryInfo);
            return deliveryInfo;
    }
    public async Task<bool> DeliveryExists(string description)
    {
        return await _context.Delivery.AnyAsync(p=>p.Description == description);
    }
    
    public void Update(Delivery delivery)
    {
        _context.Entry(delivery).State = EntityState.Modified;
    }
    public async void DeleteDelivery(int id)
    {
        Delivery del = await GetDeliveryByIdAsync(id);
        _context.Delivery.Remove(del);
        await _context.SaveChangesAsync();
        
    }
    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<Delivery>> GetDeliveryAsync()
    {
         return await _context.Delivery.ToListAsync();
    }

}
