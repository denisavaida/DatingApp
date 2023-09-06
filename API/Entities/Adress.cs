using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Adress
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public int Number{ get; set; }
        public string City {get; set; }
        public string Region {get; set; }
        public string Country {get; set; }

    }
}