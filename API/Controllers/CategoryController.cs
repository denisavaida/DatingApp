using API.DTOs;
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

        [HttpGet("{category}")] // /api/products/category/baby
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsBySelectedCategory(string categ)
        {
            var products = await _categoryRepository.GetProductsBySelectedCategoryAsync(categ);
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(products);
        }
        
    }
}