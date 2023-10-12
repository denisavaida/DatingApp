using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set;}
        public DateOnly DateOfBirth { get; set; }
        public Adress Adress{ get; set; }
        public string Role { get; set; }
        public bool Active{ get; set; }
        public List<ShoppingCart> Orders { get; set;} 
        }
}