using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class ShoppingCartDto
    {
        public int Id { get; set; }
        public List<ProductDto> Product{ get; set; }
        public float Total{ get; set; }
    }
}