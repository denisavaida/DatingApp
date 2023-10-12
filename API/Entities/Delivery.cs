using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Delivery")]
    public class Delivery
    {
        public int Id{get;set;}
       public string CompanyUrl{get;set;}
       public string Description{get;set;}
       public string Duration{get;set;}
       public float Cost{get;set;}
    }
}