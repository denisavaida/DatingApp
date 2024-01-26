using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoryController : BaseApiController
    {
        ICategoryRepository _categoryRepository;
        IMapper _mapper;
        public CategoryController(ICategoryRepository categoryRepository,IMapper mapper){
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategory(){
            var categories= await _categoryRepository.GetCategoryAsync();
            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoriesToReturn);
        }
        [HttpGet("{category}")] // /api/category/baby
        public async Task<ActionResult<ProductCategory>> GetCategoryByName(string categ)
        {
            var category = await _categoryRepository.GetCategoryByNameAsync(categ);
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(category);
        }

        [HttpPost("add")] //POST: api/category/add?name=incaltaminte...
        public async Task<ActionResult<ProductCategory>> AddCategory(ProductCategory category){
            if (await _categoryRepository.CategoryExists(category.Name)) return BadRequest("Category already exists !");

            var newCategory = new ProductCategory
            {
                Name = category.Name
            };

            await _categoryRepository.AddCategoryAsync(newCategory);
            await _categoryRepository.SaveAllAsync();

            return newCategory;
        }
              
       [HttpPut("update")]
         public void UpdateCategory(ProductCategory category){
              _categoryRepository.Update(category);
              _categoryRepository.SaveAllAsync();
        }
        
        [HttpDelete("delete/{id}")] // /products/delete/2
        public  ActionResult DeleteCategory(int id){
            try{
                _categoryRepository.DeleteCategory(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
        }
    }
}