using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Entities
{
    [Table("ProductCategory")]
    public class ProductCategory
    {
        public int id { get; set; }
        public string name { get; set; }
        public int ProductId { get; set; }

    }
}