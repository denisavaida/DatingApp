using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Subscribtion : BaseEntity
    {
        public string Email{get;set;}
    }
}