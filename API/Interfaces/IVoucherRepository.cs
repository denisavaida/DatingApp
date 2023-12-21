using API.Entities;

namespace API.Interfaces
{
    public interface IVoucherRepository
    {
        Task<Voucher> AddVoucherAsync(Voucher voucher);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Voucher>> GetVouchersAsync();
        Task<IEnumerable<Voucher>> GetOneVoucherByUserIdAsync(int id);
        void Update(Voucher voucher);
    }
}