using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Adress")]
    public class Adress : BaseEntity
    {
        public string Street { get; set; }
        public int Number{ get; set; }
        public string City {get; set; }
        public string Region {get; set; }
        public string Country {get; set; }
        public string Postcode{get;set;}
        public int AppUserId{get;set;}

    }
}