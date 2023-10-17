using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("DeliveryInfo")]
    public class DeliveryInfo
    {
        public int Id{get;set;}
        public string Firstname{get;set;}
        public string Lastname{get;set;}
        public int Telephone{get;set;}
        public Adress Adress{get;set;}
        public string AddtionalInfo{get;set;}
    }
}