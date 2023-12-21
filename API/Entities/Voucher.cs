using System.ComponentModel.DataAnnotations.Schema;


namespace API.Entities
{
    public class Voucher : BaseEntity
    {
        public string Code{get;set;}
        public int Discount{get;set;}
        public DateOnly Validity{get;set;}

        public bool Available{get;set;}

        [ForeignKey("AppUserId")]
        public int AppUserId{get;set;}

        public bool GetAvailable(){
            Available = true;
            return Available;
        }
    }
}