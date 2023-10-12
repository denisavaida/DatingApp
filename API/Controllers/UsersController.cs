using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    // [Authorize]
    public class UsersController : BaseApiController
    {
        private IUserRepository _userRepository;
        private IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {

            var users = await _userRepository.GetUsersAsync();
            var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(usersToReturn);

            
        }

        [HttpGet("{username}")] 
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            return _mapper.Map<MemberDto>(user);
        }

        // [HttpGet("detail/{username}")] 
        // public async Task<ActionResult<MemberDto>> GetUserDetail(string username)
        // {
        //     var user = await _userRepository.GetUserByUsernameAsync(username);
        //     return _mapper.Map<MemberDto>(user);
        // }

        
        [HttpPut("edit/{user}")] 
        public async Task<ActionResult<MemberDto>> EditUserDetail(AppUser appuser)
        {
            _userRepository.Update(appuser);
            await _userRepository.SaveAllAsync();
            return _mapper.Map<MemberDto>(appuser);
        }

    }
}