namespace API.Entities
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public string Name{ get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public int Total{ get; set; }
    }
}