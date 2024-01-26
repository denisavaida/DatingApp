using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SubcategoryController : BaseApiController
    {
        ISubcategoryRepository _subcategoryRepository;
        IMapper _mapper;
        public SubcategoryController(ISubcategoryRepository subcategoryRepo, IMapper mapper)
        {
            _subcategoryRepository = subcategoryRepo;
            _mapper = mapper;
        }

        [HttpGet]// /api/subcategory
        public async Task<ActionResult<IEnumerable<Subcategory>>> GetSubcategory(){
            var subcategories= await _subcategoryRepository.GetSubcategoryAsync();
            var subcategoriesToReturn =_mapper.Map<IEnumerable<Subcategory>>(subcategories);
            return Ok(subcategoriesToReturn);
        }
        [HttpGet("{categoryId}")]// /api/subcategory/25 (categId)
        public async Task<ActionResult<IEnumerable<Subcategory>>> GetSubcategoryByCategorySelected(int categoryId){
            var subcategories= await _subcategoryRepository.GetSubcategoryByCategorySelectedAsync(categoryId);
            var subcategoriesToReturn =_mapper.Map<IEnumerable<Subcategory>>(subcategories);
            return Ok(subcategoriesToReturn);
        }
          [HttpPost("add")] //POST: api/subcategory/add?name=incaltaminte...
        public async Task<ActionResult<Subcategory>> AddSubcategory(Subcategory subcategory){
            if (await _subcategoryRepository.SubcategoryExists(subcategory.Name)) return BadRequest("Subcategory already exists !");

            var newSubcategory = new Subcategory
            {
                Name = subcategory.Name,
                ProductCategoryId = subcategory.ProductCategoryId
                
            };

            await _subcategoryRepository.AddSubcategoryAsync(newSubcategory);
            await _subcategoryRepository.SaveAllAsync();

            return newSubcategory;
        }

        [HttpPut("update")]
         public void UpdateSubcategory(Subcategory subcategory){
              _subcategoryRepository.Update(subcategory);
              _subcategoryRepository.SaveAllAsync();
        }
        
        [HttpDelete("delete/{id}")] // /subcategory/delete/2
        public  ActionResult DeleteSubcategory(int id){
            try{
                _subcategoryRepository.DeleteSubcategory(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
        }
    }
}