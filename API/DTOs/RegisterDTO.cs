using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Username { get; set; }
        public string FirstName{get;set;}
        public string LastName{get;set;}
        public Adress Adress{ get; set; }
        // [Required]
        // [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
        public DateOnly DateOfBirth{ get; set; }
        public string Role{ get; set; }
    }
}