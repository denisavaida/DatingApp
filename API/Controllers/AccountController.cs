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
        private IUserRepository _userRepository;

        public AccountController(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpPost("register")] //POST: api/account/register?username=dave&password=pwd
        public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDto)
        {

            if (await _userRepository.UserExists(registerDto.Username)) return BadRequest("Username is taken !");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                FirstName = registerDto.FirstName,
                LastName =  registerDto.LastName,
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

            await _userRepository.AddAdressAsync(user.Adress);
            await _userRepository.AddUserAsync(user);
            await _userRepository.SaveAllAsync();

            return userDto;

        }

        

        [HttpPost("login")]
        public async Task<UserDto> Login(LoginDTO loginDto){
            var user =  await _userRepository.GetUserByUsernameAsync(loginDto.Username);
            if (user == null) throw new UnauthorizedAccessException("Invalid user !");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i = 0; i < computedHash.Length; i++){
                if(computedHash[i] !=user.PasswordHash[i])  throw new UnauthorizedAccessException("Invalid password ! ");
            }
            return new UserDto{
                Id = user.Id,
                Username = user.UserName,
                Role = user.Role,
                Token = _tokenService.CreateToken(user)
            };
        }


    }
}