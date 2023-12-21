using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace API.Controllers
{
    public class VoucherController : BaseApiController
    {
        private IVoucherRepository _voucherRepository;
        private IUserRepository _userRepository;
        private Voucher voucher;

        public VoucherController(IVoucherRepository voucherRepository,IUserRepository UserRepository){
            _voucherRepository = voucherRepository;
            _userRepository = UserRepository;
        }
        [HttpGet] 
        public async Task<IEnumerable<Voucher>> GetVouchers(){
           var vouchers = await _voucherRepository.GetVouchersAsync();
            return vouchers;
        }
        [HttpGet("{id}")]   
        public async Task<IEnumerable<Voucher>> GetOneVoucherByUserId(int Id){
            return await _voucherRepository.GetOneVoucherByUserIdAsync(Id);
        }
        
        [HttpPost("add")] //POST: api/voucher/add?name=weekend20...
        public async Task<ActionResult<Voucher>> AddVoucher(VoucherDto voucher){
            if(voucher.Username.ToLower() =="all"){
                this.voucher = new Voucher
                {
                Code = voucher.Code.ToUpper(),
                Discount = voucher.Discount,
                Validity = voucher.Validity,
                AppUserId = voucher.Id
                };
            }else{
                var user = await _userRepository.GetUserByUsernameAsync(voucher.Username);
                 this.voucher = new Voucher
                {
                Code = voucher.Code.ToUpper(),
                Discount = voucher.Discount,
                Validity = voucher.Validity,
                AppUserId = user.Id
                };
            }
           

            await _voucherRepository.AddVoucherAsync(this.voucher);
            await _voucherRepository.SaveAllAsync();

            return this.voucher;
        }

        [HttpPut("update/{voucher}")] 
        public async Task<ActionResult<Voucher>> UpdateVoucher(Voucher voucher)
        {
            _voucherRepository.Update(voucher);
            await _voucherRepository.SaveAllAsync();
            return voucher;
        }
    }
       
}