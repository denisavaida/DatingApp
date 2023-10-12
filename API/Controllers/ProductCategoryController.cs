using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace API.Controllers
{
    public class ProductCategoryController : BaseApiController
    {
        IProductRepository _productRepository;
        IMapper _mapper;
        public ProductCategoryController(IProductRepository productRepository,IMapper mapper){
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetProductCategory(){
            var categories= await _productRepository.GetProductCategoryAsync();
            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoriesToReturn);
        }
        
    }
}