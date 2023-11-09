using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("DeliveryInfo")]
    public class DeliveryInfo : BaseEntity
    {
        public string Firstname{get;set;}
        public string Lastname{get;set;}
        public int Telephone{get;set;}
        public Adress Adress{get;set;}
        public string AddtionalInfo{get;set;}
    }
}