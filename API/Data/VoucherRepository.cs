using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class VoucherRepository : IVoucherRepository
    {
        private DataContext _context;

        public VoucherRepository(DataContext context){
            _context = context;
        }

        public async Task<Voucher> AddVoucherAsync(Voucher voucher)
        {
             await _context.Vouchers.AddAsync(voucher);
             return voucher;
        }

        public async Task<IEnumerable<Voucher>> GetOneVoucherByUserIdAsync(int userId)
        {
            return await _context.Vouchers.Where(x=>x.AppUserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Voucher>> GetVouchersAsync()
        {
           return await _context.Vouchers.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Voucher voucher)
        {
            _context.Entry(voucher).State = EntityState.Modified;
        }

    }
}