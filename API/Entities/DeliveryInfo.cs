using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("DeliveryInfo")]
    public class DeliveryInfo
    {
        public int Id{get;set;}
        public string Name{get;set;}
        public string Surname{get;set;}
        public string Telephone{get;set;}
        public Adress Adress{get;set;}
        public string AddtionalInfo{get;set;}
    }
}