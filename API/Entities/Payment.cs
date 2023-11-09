using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Payment")]
    public class Payment : BaseEntity
    {
        public string Icon{get;set;}
        public string Description{get;set;}
        public int CardId{get;set;}
        public Card Card{get;set;}
    }
}