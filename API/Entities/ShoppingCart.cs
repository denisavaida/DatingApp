using API.DTOs;

namespace API.Entities
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public List<Product> Products{ get; set; }
        public int Total{ get; set; }
    }
}