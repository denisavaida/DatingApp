using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController //Inheritance
    {
        private ITokenService _tokenService;
        private IMapper _mapper;
        private IUserRepository _userRepository;
        private IProductRepository _productRepository;

        public AccountController(IUserRepository userRepository, ITokenService tokenService, IMapper mapper, IProductRepository productRepository)
        {
            _userRepository = userRepository;
            _productRepository = productRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")] //POST: api/account/register?username=dave&password=pwd
        public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDto)
        {

            if (await _userRepository.UserExists(registerDto.Username)) return BadRequest("Username is taken !");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key, 
                Role = registerDto.Role,
                DateOfBirth = registerDto.DateOfBirth,
                Adress = registerDto.Adress,
        
            };
            var userDto = new UserDto{
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

            // var shoppingCart = new ShoppingCart
            // {
            //     Product = new(),
            //     AppUserId = user.Id,
            //     AppUser = userDto
            // };

            // await _productRepository.AddShoppingCartAsync(shoppingCart);
            await _userRepository.AddAdressAsync(user.Adress);
            await _userRepository.AddUserAsync(user);
            await _userRepository.SaveAllAsync();

            return userDto;

        }

        [HttpPost("login")]
        public async Task<UserDto> Login(LoginDTO loginDto){
            var user =  await _userRepository.GetUserByUsernameAsync(loginDto.Username);
            if (user == null) throw new UnauthorizedAccessException();
            using var hmac = new HMACSHA512(user.PasswordSalt);
            
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i = 0; i < computedHash.Length; i++){
                if(computedHash[i] !=user.PasswordHash[i])  throw new UnauthorizedAccessException("Invalid password ! ");
            }
            return new UserDto{
                Id = user.Id,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

     
    }
}