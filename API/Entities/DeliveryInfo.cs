using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("DeliveryInfo")]
    public class DeliveryInfo : BaseEntity
    {
        public string Firstname{get;set;}
        public string Lastname{get;set;}
        public string Telephone{get;set;}

        [ForeignKey("AdressId")]
        public int AdressId{get;set;}
        public Adress Adress{get;set;}
        public string AddtionalInfo{get;set;}
        
        [ForeignKey("AppUserId")]
        public int AppUserId{get;set;} 
    }
}