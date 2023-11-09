namespace API.Entities
{
    public class Measurement : BaseEntity
    {
        public string Name { get; set; }
        public ProductCategory Category{get; set;}
        public int ProductId { get; set; }
    }
}