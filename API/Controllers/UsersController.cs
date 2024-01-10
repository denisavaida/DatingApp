using System.Globalization;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            return _mapper.Map<MemberDto>(user);
        }

        
        [HttpGet("adress/{id}")] 
        public async Task<ActionResult<Adress>> GetAdressByUserId(int id)
        {
            var adress = await _userRepository.GetAdressByUserId(id);
            return _mapper.Map<Adress>(adress);
        }
        // [HttpGet("{id}")] 
        // public async Task<ActionResult<MemberDto>> GetUserById(int id)
        // {
        //     var user = await _userRepository.GetUserByIdAsync(id);
        //     return _mapper.Map<MemberDto>(user);
        // }
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
        [HttpGet("subscribers")]
        public async Task<IEnumerable<Subscribtion>> GetSubscribers(){
            var subscribers = await _userRepository.GetSubscribersAsync();
            await _userRepository.SaveAllAsync();
            return  subscribers;
        }

        [HttpPost("subscribe")]
        public async Task<ActionResult<Subscribtion>> AddSubscription(Subscribtion subscribtion){
            await _userRepository.AddSubscriptionAsync(subscribtion);
            await _userRepository.SaveAllAsync();
            return _mapper.Map<Subscribtion>(subscribtion);
        }

    }
}