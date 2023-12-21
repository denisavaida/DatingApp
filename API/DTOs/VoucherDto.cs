using API.Entities;

namespace API.DTOs
{
    public class VoucherDto: BaseEntity
    {
       
        public string Code{get;set;}
        public int Discount{get;set;}
        public DateOnly Validity{get;set;}
        public string Username{get;set;}
    }
    
}