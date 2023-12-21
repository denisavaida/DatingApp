using API.Entities;

namespace API.DTOs
{
    public class ShoppingCartDto : BaseEntity
    {
        public List<ProductDto> Product{ get; set; }
        public float Total{ get; set; }
    }
}