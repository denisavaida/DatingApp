using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryGenderController : ControllerBase
    {
        ICategoryGenderRepository _categoryGenderRepository;
        IMapper _mapper;

        public CategoryGenderController(ICategoryGenderRepository categoryGenderRepository, IMapper mapper){
            _categoryGenderRepository = categoryGenderRepository;
            _mapper = mapper;
        }
                
        [HttpGet]// /api/categoryGender
        public async Task<ActionResult<IEnumerable<CategoryGender>>> GetCategoryGender(){
            var genders= await _categoryGenderRepository.GetCategoryGenderAsync();
            var gendersToReturn =_mapper.Map<IEnumerable<CategoryGender>>(genders);
            return Ok(gendersToReturn);
        }
        
        [HttpPost("add")] //POST: api/categoryGender/add?name=incaltaminte...
        public async Task<ActionResult<CategoryGender>> AddCategoryGender(CategoryGender categGender){
            if (await _categoryGenderRepository.CategoryGenderExists(categGender.Name)) return BadRequest("Category already exists !");

            var newCategoryGender = new CategoryGender
            {
                Name = categGender.Name
            };

            await _categoryGenderRepository.AddCategoryGenderAsync(newCategoryGender);
            await _categoryGenderRepository.SaveAllAsync();

            return newCategoryGender;
        }
        
       [HttpPut("update")]
         public void UpdateCategoryGender(CategoryGender categoryGender){
              _categoryGenderRepository.Update(categoryGender);
              _categoryGenderRepository.SaveAllAsync();
        }
        
        [HttpDelete("delete/{id}")] // /products/delete/2
        public  ActionResult DeleteCategoryGender(int id){
            try{
                _categoryGenderRepository.DeleteCategoryGender(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
        }
    }
}